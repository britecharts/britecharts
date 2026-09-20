// Optimized resize handler based on https://developer.mozilla.org/en-US/docs/Web/Events/resize

const optimizedResize = (function () {
    const callbacks = [];
    const isBrowser = typeof window === 'object';
    let running = false;
    let cachedWidth = 0;
    const delay = 66;

    // run the actual callbacks. Over a copy, since a callback can remove itself
    const runCallbacks = () => {
        try {
            [...callbacks].forEach((callback) => {
                callback();
            });
        } finally {
            running = false;
        }
    };

    // fired on resize event: only a change of width is worth a notification
    const resizeHorizontal = () => {
        if (!isBrowser) {
            return;
        }
        const newWidth = window.innerWidth;

        if (cachedWidth !== newWidth) {
            cachedWidth = newWidth;

            if (!running) {
                running = true;

                if (window.requestAnimationFrame) {
                    window.requestAnimationFrame(runCallbacks);
                } else {
                    setTimeout(runCallbacks, delay);
                }
            }
        }
    };

    return {
        /**
         * Calls the callback, on the next animation frame, whenever the width of
         * the window changes. The window is listened to while at least one
         * callback is registered
         * @param {Function} callback   What to call. Pass it to remove() to stop
         */
        addHorizontal(callback) {
            if (!isBrowser || !callback) {
                return;
            }
            if (!callbacks.length) {
                // Compare with the width as it is when listening starts, not as
                // it was when this module loaded
                cachedWidth = window.innerWidth;
                window.addEventListener('resize', resizeHorizontal);
            }
            callbacks.push(callback);
        },

        /**
         * Stops calling a callback. The window is no longer listened to once the
         * last one is gone, and is listened to again by the next one added
         * @param {Function} callback   What was passed to addHorizontal
         */
        remove(callback) {
            const index = callbacks.indexOf(callback);

            if (index === -1) {
                return;
            }

            callbacks.splice(index, 1);

            if (!callbacks.length && isBrowser) {
                window.removeEventListener('resize', resizeHorizontal);
            }
        },
    };
})();

export default optimizedResize;
