import { enableKeyboardNavigation } from './keyboard';

const SVG = 'http://www.w3.org/2000/svg';

describe('keyboard navigation helper', () => {
    let svg, marks, events;

    const press = (key) =>
        svg.dispatchEvent(
            new KeyboardEvent('keydown', {
                key,
                bubbles: true,
                cancelable: true,
            })
        );
    const enable = (options = {}) =>
        enableKeyboardNavigation(svg, {
            isEnabled: true,
            stops: () => marks.map((target) => ({ target })),
            ...options,
        });

    beforeEach(() => {
        svg = document.createElementNS(SVG, 'svg');
        marks = [0, 1, 2, 3].map((index) => {
            const mark = document.createElementNS(SVG, 'rect');

            mark.id = `mark-${index}`;
            svg.appendChild(mark);

            return mark;
        });
        document.body.appendChild(svg);
        events = [];
        [
            'mouseenter',
            'mouseleave',
            'mouseover',
            'mouseout',
            'mousemove',
        ].forEach((type) =>
            svg.addEventListener(
                type,
                (event) => events.push(`${type} ${event.target.id || 'svg'}`),
                true
            )
        );
    });

    afterEach(() => {
        svg.remove();
    });

    it('should give the svg one tab stop', () => {
        enable();

        expect(svg.getAttribute('tabindex')).toBe('0');
    });

    it('should move a pretend pointer onto the first point on ArrowRight', () => {
        enable();
        press('ArrowRight');

        expect(events).toEqual([
            'mouseenter svg',
            'mouseover mark-0',
            'mousemove mark-0',
        ]);
    });

    it('should move off one point and onto the next', () => {
        enable();
        press('ArrowRight');
        events = [];
        press('ArrowRight');

        expect(events).toEqual([
            'mouseout mark-0',
            'mouseover mark-1',
            'mousemove mark-1',
        ]);
    });

    it('should start from the last point on ArrowLeft, and stop at either end', () => {
        enable();
        press('ArrowLeft');
        press('ArrowRight');
        press('ArrowRight');

        expect(events.filter((e) => e.startsWith('mousemove'))).toEqual([
            'mousemove mark-3',
            'mousemove mark-3',
            'mousemove mark-3',
        ]);
    });

    it('should go to the first and last points on Home and End', () => {
        enable();
        press('End');
        press('Home');

        expect(events.filter((e) => e.startsWith('mousemove'))).toEqual([
            'mousemove mark-3',
            'mousemove mark-0',
        ]);
    });

    it('should move by a row on ArrowDown and ArrowUp when given a row length', () => {
        enable({ rowLength: 2 });
        press('ArrowDown');
        press('ArrowDown');
        press('ArrowUp');

        expect(events.filter((e) => e.startsWith('mousemove'))).toEqual([
            'mousemove mark-0',
            'mousemove mark-2',
            'mousemove mark-0',
        ]);
    });

    it('should let go on Escape and on blur', () => {
        enable();
        press('ArrowRight');
        events = [];
        press('Escape');

        expect(events).toEqual(['mouseout mark-0', 'mouseleave svg']);

        press('ArrowRight');
        events = [];
        svg.dispatchEvent(new FocusEvent('blur'));

        expect(events).toEqual(['mouseout mark-0', 'mouseleave svg']);
    });

    it('should keep the page from scrolling on the keys it handles, and only those', () => {
        enable();
        const arrow = new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            cancelable: true,
        });
        const tab = new KeyboardEvent('keydown', {
            key: 'Tab',
            cancelable: true,
        });

        svg.dispatchEvent(arrow);
        svg.dispatchEvent(tab);

        expect(arrow.defaultPrevented).toBe(true);
        expect(tab.defaultPrevented).toBe(false);
    });

    it('should put the pointer at a stop point, in the svg coordinates', () => {
        let position;

        svg.addEventListener('mousemove', (event) => {
            position = [event.clientX, event.clientY];
        });
        enableKeyboardNavigation(svg, {
            isEnabled: true,
            stops: () => [{ target: svg, point: [120, 40] }],
        });
        press('ArrowRight');

        // jsdom has no layout, so the svg sits at the origin
        expect(position).toEqual([120, 40]);
    });

    it('should do nothing and drop its tab stop when turned off', () => {
        enable();
        enable({ isEnabled: false });
        press('ArrowRight');

        expect(svg.hasAttribute('tabindex')).toBe(false);
        expect(events).toEqual([]);
    });

    it('should add its listeners once, however often the chart renders', () => {
        enable();
        enable();
        press('ArrowRight');

        expect(events.filter((e) => e.startsWith('mousemove'))).toHaveLength(1);
    });
});
