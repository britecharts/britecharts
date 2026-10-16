import { labelChart } from './a11y';

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

const anSvg = () => {
    const svg = document.createElementNS(SVG_NAMESPACE, 'svg');

    svg.appendChild(document.createElementNS(SVG_NAMESPACE, 'g'));

    return svg;
};

const label = (
    svg: Element,
    a11yTitle: string | null = null,
    a11yDescription: string | null = null
) =>
    labelChart(svg, { a11yTitle, a11yDescription, fallbackTitle: 'Bar chart' });

describe('labelChart', () => {
    it('should give the svg the img role by default', () => {
        const svg = anSvg();

        label(svg);

        expect(svg.getAttribute('role')).toBe('img');
    });

    it('should use the role it is given', () => {
        const svg = anSvg();

        labelChart(svg, {
            a11yTitle: null,
            a11yDescription: null,
            fallbackTitle: 'Legend',
            role: 'group',
        });

        expect(svg.getAttribute('role')).toBe('group');
    });

    it('should name the chart by its type when no title is set', () => {
        const svg = anSvg();

        label(svg);

        expect(svg.querySelector('title')?.textContent).toBe('Bar chart');
    });

    it('should put the title first and point aria-labelledby at it', () => {
        const svg = anSvg();

        label(svg, 'Sales by month');

        const title = svg.firstElementChild;

        expect(title?.tagName).toBe('title');
        expect(title?.textContent).toBe('Sales by month');
        expect(svg.getAttribute('aria-labelledby')).toBe(title?.id);
    });

    it('should add a description after the title and point aria-describedby at it', () => {
        const svg = anSvg();

        label(svg, 'Sales by month', 'Sales peak in December');

        const desc = svg.children[1];

        expect(desc.tagName).toBe('desc');
        expect(desc.textContent).toBe('Sales peak in December');
        expect(svg.getAttribute('aria-describedby')).toBe(desc.id);
    });

    it('should reuse its elements on the next render, keeping their ids', () => {
        const svg = anSvg();

        label(svg, 'First', 'First description');
        const titleId = svg.querySelector('title')?.id;
        const descId = svg.querySelector('desc')?.id;

        label(svg, 'Second', 'Second description');

        expect(svg.querySelectorAll('title')).toHaveLength(1);
        expect(svg.querySelectorAll('desc')).toHaveLength(1);
        expect(svg.querySelector('title')?.id).toBe(titleId);
        expect(svg.querySelector('desc')?.id).toBe(descId);
        expect(svg.querySelector('title')?.textContent).toBe('Second');
    });

    it('should remove the description once it is unset', () => {
        const svg = anSvg();

        label(svg, 'Sales', 'A description');
        label(svg, 'Sales', null);

        expect(svg.querySelector('desc')).toBeNull();
        expect(svg.hasAttribute('aria-describedby')).toBe(false);
    });

    it('should give each chart its own ids', () => {
        const first = anSvg();
        const second = anSvg();

        label(first);
        label(second);

        expect(first.querySelector('title')?.id).not.toBe(
            second.querySelector('title')?.id
        );
    });

    it('should ignore a title nested deeper in the chart', () => {
        const svg = anSvg();
        const nested = document.createElementNS(SVG_NAMESPACE, 'title');

        svg.firstElementChild?.appendChild(nested);
        label(svg, 'Sales');

        expect(svg.firstElementChild?.tagName).toBe('title');
        expect(nested.textContent).toBe('');
    });

    it('should do nothing without an svg', () => {
        expect(() => label(null as unknown as Element)).not.toThrow();
    });
});
