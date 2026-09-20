// The registry every responsive component registers with. It is a module
// singleton, so each test gets a fresh copy: a leak in one must not be able to
// hide, or cause, a failure in another.
describe('optimizedResize', () => {
    let optimizedResize;
    let addListener;
    let removeListener;
    let animationFrame;
    let resizeListeners;

    // The listener the registry attached to the window, as the browser would
    // call it when the window is resized
    const resizeTo = (width) => {
        window.innerWidth = width;
        [...resizeListeners].forEach((listener) => listener());
    };

    beforeEach(() => {
        window.innerWidth = 1000;
        resizeListeners = new Set();

        addListener = jest
            .spyOn(window, 'addEventListener')
            .mockImplementation((type, listener) => {
                if (type === 'resize') {
                    resizeListeners.add(listener);
                }
            });
        removeListener = jest
            .spyOn(window, 'removeEventListener')
            .mockImplementation((type, listener) => {
                if (type === 'resize') {
                    resizeListeners.delete(listener);
                }
            });
        // One animation frame, run at once
        animationFrame = jest
            .spyOn(window, 'requestAnimationFrame')
            .mockImplementation((callback) => {
                callback(0);

                return 0;
            });

        jest.isolateModules(() => {
            optimizedResize = require('./optimizedResize.js').default;
        });
    });

    // Only what this spec spied on: jest.restoreAllMocks() would also undo the
    // console spies the setup file installs for its fail-on-console check
    afterEach(() => {
        [addListener, removeListener, animationFrame].forEach((spy) =>
            spy.mockRestore()
        );
    });

    const resizeCalls = () =>
        addListener.mock.calls.filter(([type]) => type === 'resize');

    describe('listening to the window', () => {
        it('should not listen before anything is registered', () => {
            expect(resizeCalls()).toHaveLength(0);
        });

        it('should attach a single listener for many callbacks', () => {
            optimizedResize.addHorizontal(jest.fn());
            optimizedResize.addHorizontal(jest.fn());
            optimizedResize.addHorizontal(jest.fn());

            expect(resizeCalls()).toHaveLength(1);
        });

        it('should keep listening while a callback is left', () => {
            const first = jest.fn();
            const second = jest.fn();

            optimizedResize.addHorizontal(first);
            optimizedResize.addHorizontal(second);
            optimizedResize.remove(first);

            expect(resizeListeners.size).toBe(1);
        });

        it('should stop listening when the last callback is removed', () => {
            const only = jest.fn();

            optimizedResize.addHorizontal(only);
            optimizedResize.remove(only);

            expect(resizeListeners.size).toBe(0);
        });

        it('should listen again when a callback is added after all were removed', () => {
            const first = jest.fn();

            optimizedResize.addHorizontal(first);
            optimizedResize.remove(first);
            optimizedResize.addHorizontal(jest.fn());

            expect(resizeListeners.size).toBe(1);
            expect(removeListener).toHaveBeenCalled();
        });
    });

    describe('notifying the callbacks', () => {
        it('should call every callback when the width changes', () => {
            const first = jest.fn();
            const second = jest.fn();

            optimizedResize.addHorizontal(first);
            optimizedResize.addHorizontal(second);
            resizeTo(800);

            expect(first).toHaveBeenCalledTimes(1);
            expect(second).toHaveBeenCalledTimes(1);
        });

        it('should not call them when only the height changed', () => {
            const callback = jest.fn();

            optimizedResize.addHorizontal(callback);
            resizeTo(1000);

            expect(callback).not.toHaveBeenCalled();
        });

        // The leak: the first unmount used to end resizing for everyone else
        it('should keep notifying the remaining callbacks after one is removed', () => {
            const gone = jest.fn();
            const remaining = jest.fn();

            optimizedResize.addHorizontal(gone);
            optimizedResize.addHorizontal(remaining);
            optimizedResize.remove(gone);
            resizeTo(800);

            expect(remaining).toHaveBeenCalledTimes(1);
        });

        it('should not call a callback that was removed', () => {
            const gone = jest.fn();

            optimizedResize.addHorizontal(gone);
            optimizedResize.addHorizontal(jest.fn());
            optimizedResize.remove(gone);
            resizeTo(800);

            expect(gone).not.toHaveBeenCalled();
        });

        it('should notify a callback added after all the others were removed', () => {
            const first = jest.fn();
            const later = jest.fn();

            optimizedResize.addHorizontal(first);
            optimizedResize.remove(first);
            optimizedResize.addHorizontal(later);
            resizeTo(800);

            expect(later).toHaveBeenCalledTimes(1);
            expect(first).not.toHaveBeenCalled();
        });

        it('should let a callback remove itself while being notified', () => {
            const other = jest.fn();
            const selfRemoving = jest.fn(() =>
                optimizedResize.remove(selfRemoving)
            );

            optimizedResize.addHorizontal(selfRemoving);
            optimizedResize.addHorizontal(other);

            expect(() => resizeTo(800)).not.toThrow();
            expect(other).toHaveBeenCalledTimes(1);
        });

        // A callback that throws must not leave the registry believing a run
        // is still under way, which would ignore every resize after it
        it('should keep notifying after a callback threw', () => {
            const later = jest.fn();
            const throwing = jest.fn(() => {
                throw new Error('a callback failed');
            });

            optimizedResize.addHorizontal(throwing);
            optimizedResize.addHorizontal(later);

            expect(() => resizeTo(800)).toThrow('a callback failed');

            optimizedResize.remove(throwing);
            resizeTo(700);

            expect(later).toHaveBeenCalledTimes(1);
        });

        it('should compare with the width at the time the first callback was added', () => {
            const callback = jest.fn();

            window.innerWidth = 700;
            optimizedResize.addHorizontal(callback);
            resizeTo(700);

            expect(callback).not.toHaveBeenCalled();
        });
    });

    it('should ignore removing a callback it does not know', () => {
        expect(() => optimizedResize.remove(jest.fn())).not.toThrow();
    });

    it('should ignore adding something that is not a callback', () => {
        expect(() => optimizedResize.addHorizontal(undefined)).not.toThrow();
    });
});
