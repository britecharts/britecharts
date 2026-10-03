import type { TooltipDataShape } from '@britecharts/core';

import tooltip from './tooltipChart';

// d3 stashes the bound datum on the node itself. tooltipChart binds an empty
// array of its own, since it takes no data argument.
type NodeWithDatum = HTMLElement & { __data__?: TooltipDataShape[] };

const datumOf = (el: HTMLElement) => (el as NodeWithDatum).__data__;

describe('tooltip Chart', () => {
    let anchor: HTMLElement;

    beforeEach(() => {
        anchor = document.createElement('div');
    });

    describe('create', () => {
        describe('when incorrect arguments are used', () => {
            describe('when the DOM element is not passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        // @ts-expect-error el is required
                        tooltip.create(undefined, {});
                    }).toThrow('A root container is required');
                });
            });

            describe('when a non-supported method is passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        // @ts-expect-error not an accessor on the chart
                        tooltip.create(anchor, { test: 'test' });
                    }).toThrow('Method not supported by Britechart: test');
                });
            });
        });

        describe('when proper arguments are passed', () => {
            it('should set an empty data as a DOM property', () => {
                const expected = 0;

                tooltip.create(anchor);

                const actual = datumOf(anchor)?.length;

                expect(actual).toEqual(expected);
            });

            it('should set the title', () => {
                const expected = 'tooltipTitle';

                const chart = tooltip.create(anchor, { title: expected });

                const actual = chart.title();

                expect(actual).toEqual(expected);
            });

            it('should set the valueLabel', () => {
                const expected = 'label';

                const chart = tooltip.create(anchor, {
                    valueLabel: expected,
                });

                const actual = chart.valueLabel();

                expect(actual).toEqual(expected);
            });

            it('should set the locale', () => {
                const expected = 'us-EN';

                const chart = tooltip.create(anchor, { locale: expected });

                const actual = chart.locale();

                expect(actual).toEqual(expected);
            });

            it('should set the dateLabel', () => {
                const expected = 'dateUTC';

                const chart = tooltip.create(anchor, { dateLabel: expected });

                const actual = chart.dateLabel();

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('update', () => {
        describe('when updating configuration', () => {
            describe('when new configuration is passed', () => {
                it('should update the configuration in the chart', () => {
                    const expected = 'expectedTitle';
                    const firstTitle = 'title';
                    const chart = tooltip.create(anchor, { title: firstTitle });

                    tooltip.update(anchor, { title: expected }, {}, chart);

                    const actual = chart.title();

                    expect(actual).toEqual(expected);
                });
            });
        });
    });
});
