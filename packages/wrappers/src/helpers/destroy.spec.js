import { removeChartSvg, removeTooltip } from './destroy';

const svg = () => document.createElementNS('http://www.w3.org/2000/svg', 'svg');

describe('destroy helpers', () => {
    describe('removeChartSvg', () => {
        it('should remove the svgs that are direct children only', () => {
            const el = document.createElement('div');
            const wrapper = document.createElement('div');
            const nested = svg();

            wrapper.appendChild(nested);
            el.appendChild(svg());
            el.appendChild(wrapper);

            removeChartSvg(el);

            expect(el.querySelectorAll('svg')).toHaveLength(1);
            expect(nested.parentNode).toBe(wrapper);
        });

        it('should not remove the element itself', () => {
            const parent = document.createElement('div');
            const el = document.createElement('div');

            parent.appendChild(el);
            removeChartSvg(el);

            expect(el.parentNode).toBe(parent);
        });

        it('should do nothing without an element', () => {
            expect(() => removeChartSvg(null)).not.toThrow();
        });
    });

    describe('removeTooltip', () => {
        const group = (className) => {
            const g = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'g'
            );

            g.setAttribute('class', className);

            return g;
        };

        it('should remove the tooltip groups at any depth, and never an svg', () => {
            const el = document.createElement('div');
            const chartSvg = svg();

            chartSvg.appendChild(group('britechart-tooltip'));
            chartSvg.appendChild(group('britechart-mini-tooltip'));
            el.appendChild(chartSvg);

            removeTooltip(el);

            expect(el.querySelectorAll('svg')).toHaveLength(1);
            expect(el.querySelectorAll('g')).toHaveLength(0);
        });

        it('should do nothing without an element', () => {
            expect(() => removeTooltip(undefined)).not.toThrow();
        });
    });
});
