import { labelChart, motionDuration, prefersReducedMotion } from './a11y';

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

        expect(svg.getAttribute('aria-label')).toBe('Bar chart');
    });

    it('should name the chart with an aria-label, not a title element', () => {
        const svg = anSvg();

        label(svg, 'Sales by month');

        // Browsers show an svg's <title> as a tooltip on hover
        expect(svg.getAttribute('aria-label')).toBe('Sales by month');
        expect(svg.querySelector('title')).toBeNull();
        expect(svg.hasAttribute('aria-labelledby')).toBe(false);
    });

    it('should add a description first and point aria-describedby at it', () => {
        const svg = anSvg();

        label(svg, 'Sales by month', 'Sales peak in December');

        const desc = svg.firstElementChild;

        expect(desc?.tagName).toBe('desc');
        expect(desc?.textContent).toBe('Sales peak in December');
        expect(svg.getAttribute('aria-describedby')).toBe(desc?.id);
    });

    it('should reuse its description on the next render, keeping its id', () => {
        const svg = anSvg();

        label(svg, 'First', 'First description');
        const descId = svg.querySelector('desc')?.id;

        label(svg, 'Second', 'Second description');

        expect(svg.querySelectorAll('desc')).toHaveLength(1);
        expect(svg.querySelector('desc')?.id).toBe(descId);
        expect(svg.querySelector('desc')?.textContent).toBe(
            'Second description'
        );
        expect(svg.getAttribute('aria-label')).toBe('Second');
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

        label(first, null, 'One');
        label(second, null, 'Two');

        expect(first.querySelector('desc')?.id).not.toBe(
            second.querySelector('desc')?.id
        );
    });

    it('should ignore a desc nested deeper in the chart', () => {
        const svg = anSvg();
        const nested = document.createElementNS(SVG_NAMESPACE, 'desc');

        svg.firstElementChild?.appendChild(nested);
        label(svg, 'Sales', 'A description');

        expect(svg.firstElementChild?.tagName).toBe('desc');
        expect(nested.textContent).toBe('');
    });

    it('should do nothing without an svg', () => {
        expect(() => label(null as unknown as Element)).not.toThrow();
    });
});

describe('prefersReducedMotion', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('should be true when the system asks for reduced motion', () => {
        vi.stubGlobal('matchMedia', (query: string) => ({
            matches: query === '(prefers-reduced-motion: reduce)',
        }));

        expect(prefersReducedMotion()).toBe(true);
    });

    it('should be false when the system does not', () => {
        vi.stubGlobal('matchMedia', () => ({ matches: false }));

        expect(prefersReducedMotion()).toBe(false);
    });

    it('should be false without matchMedia', () => {
        vi.stubGlobal('matchMedia', undefined);

        expect(prefersReducedMotion()).toBe(false);
    });
});

describe('motionDuration', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('should keep the duration when the system does not ask for reduced motion', () => {
        vi.stubGlobal('matchMedia', () => ({ matches: false }));

        expect(motionDuration(200)).toBe(200);
    });

    it('should be 0 when the system asks for reduced motion', () => {
        vi.stubGlobal('matchMedia', () => ({ matches: true }));

        expect(motionDuration(200)).toBe(0);
    });
});
