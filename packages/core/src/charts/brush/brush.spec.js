import * as d3 from 'd3';

import chart from './brush';
import { BrushDataBuilder } from './brushChartDataBuilder';

const aTestDataSet = () => new BrushDataBuilder();
const buildDataSet = (dataSetName) => {
    return aTestDataSet()[dataSetName]().build();
};

// the path alternates x,y pairs, so every odd number is a y
const yCoordinatesOf = (path) =>
    path
        .replace(/[A-Za-z]/g, ' ')
        .trim()
        .split(/[\s,]+/)
        .map(Number)
        .filter((_coordinate, index) => index % 2 === 1);

// A container of its own, so a test can configure the chart before it first
// draws: the one in `beforeEach` has already drawn.
const drawInNewContainer = (
    chartToDraw,
    data = buildDataSet('withSimpleData')
) => {
    const container = d3.select('#fixture').append('div');

    container.datum(data).call(chartToDraw);

    return container;
};

describe('brush Chart', () => {
    let brushChart, dataset, containerFixture;

    beforeEach(() => {
        const fixture =
            '<div id="fixture"><div class="test-container"></div></div>';

        dataset = buildDataSet('withSimpleData');
        brushChart = chart();
        // adds an html fixture to the DOM
        document.body.insertAdjacentHTML('afterbegin', fixture);

        containerFixture = d3.select('.test-container');
        containerFixture.datum(dataset).call(brushChart);
    });

    // remove the html fixture from the DOM
    afterEach(() => {
        document.body.removeChild(document.getElementById('fixture'));
    });

    describe('render', () => {
        it('should show a chart with minimal requirements', () => {
            const expected = 1;
            const actual = containerFixture.select('.brush-chart').size();

            expect(actual).toEqual(expected);
        });

        describe('groups', () => {
            it('should create a container-group', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('g.container-group')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should create a chart-group', () => {
                const expected = 1;
                const actual = containerFixture.select('g.chart-group').size();

                expect(actual).toEqual(expected);
            });

            it('should create a x-axis-group', () => {
                const expected = 1;
                const actual = containerFixture.select('g.x-axis-group').size();

                expect(actual).toEqual(expected);
            });

            it('should draw a month X axis', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('.x-axis-group .axis.sub-x')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should create a metadata-group', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('g.metadata-group')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should create a brush-group', () => {
                const expected = 1;
                const actual = containerFixture.select('g.brush-group').size();

                expect(actual).toEqual(expected);
            });

            it('should create a loading-state-group', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('g.loading-state-group')
                    .size();

                expect(actual).toEqual(expected);
            });
        });

        it('should render an X axis', () => {
            const expected = 1;
            const actual = containerFixture.selectAll('.x.axis').size();

            expect(actual).toEqual(expected);
        });

        it('should render an area', () => {
            const expected = 1;
            const actual = containerFixture.selectAll('.brush-area').size();

            expect(actual).toEqual(expected);
        });

        it('should not render a missing data area', () => {
            const expected = 0;
            const actual = containerFixture
                .selectAll('.brush-chart .missing-brush-area')
                .size();

            expect(actual).toEqual(expected);
        });

        it('should render a brush rect overlay', () => {
            const expected = 1;
            const actual = containerFixture
                .selectAll('.overlay.brush-rect')
                .size();

            expect(actual).toEqual(expected);
        });

        it('should render a brush rect selection', () => {
            const expected = 1;
            const actual = containerFixture
                .selectAll('.selection.brush-rect')
                .size();

            expect(actual).toEqual(expected);
        });

        it('should render an e handle', () => {
            const expected = 1;
            const actual = containerFixture
                .selectAll('.handle.handle--e.brush-rect')
                .size();

            expect(actual).toEqual(expected);
        });

        it('should render an w handle', () => {
            const expected = 1;
            const actual = containerFixture
                .selectAll('.handle.handle--w.brush-rect')
                .size();

            expect(actual).toEqual(expected);
        });

        describe('when reloading with a different dataset', () => {
            it('should render in the same svg', () => {
                const expected = 1;
                const newDataset = buildDataSet('withShortData');
                let actual;

                containerFixture.datum(newDataset).call(brushChart);
                actual = containerFixture.selectAll('.brush-chart').size();

                expect(actual).toEqual(expected);
            });

            it('should render one area', () => {
                const expected = 1;
                const newDataset = buildDataSet('withShortData');
                let actual;

                containerFixture.datum(newDataset).call(brushChart);
                actual = containerFixture
                    .selectAll('.brush-chart .brush-area')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should render one axis', () => {
                const expected = 1;
                const newDataset = buildDataSet('withShortData');
                let actual;

                containerFixture.datum(newDataset).call(brushChart);
                actual = containerFixture
                    .selectAll('.brush-chart .x.axis')
                    .size();

                expect(actual).toEqual(expected);
            });
        });

        describe('when loading missing data', () => {
            beforeEach(() => {
                const fixture =
                    '<div id="fixture"><div class="test-container"></div></div>';

                dataset = buildDataSet('withMissingData');
                brushChart = chart();
                // adds an html fixture to the DOM
                document.body.insertAdjacentHTML('afterbegin', fixture);

                containerFixture = d3.select('.test-container');
                containerFixture.datum(dataset).call(brushChart);
            });

            // remove the html fixture from the DOM
            afterEach(() => {
                document.body.removeChild(document.getElementById('fixture'));
            });

            it('should still render the chart', () => {
                const expected = 1;
                const actual = containerFixture
                    .selectAll('.brush-chart')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should render the regular area', () => {
                const expected = 1;
                const actual = containerFixture
                    .selectAll('.brush-chart .brush-area')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should render a missing data area', () => {
                const expected = 1;
                const actual = containerFixture
                    .selectAll('.brush-chart .missing-brush-area')
                    .size();

                expect(actual).toEqual(expected);
            });
        });

        describe('when isLoading is true', () => {
            it('should render the loading state', () => {
                const expected = 1;

                brushChart.isLoading(true);
                containerFixture.datum(dataset).call(brushChart);

                const actual = containerFixture
                    .select('.brush-load-state')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should remove the loading state once it has finished', () => {
                const loadingChart = chart().isLoading(true);
                const container = drawInNewContainer(loadingChart);
                const expected = 0;

                container.call(loadingChart.isLoading(false));

                const actual = container.select('.brush-load-state').size();

                expect(actual).toEqual(expected);
            });

            it('should draw a date range set before loading finished', () => {
                const dateRange = [
                    '2015-07-10T00:00:00Z',
                    '2015-07-20T00:00:00Z',
                ];
                const loadingChart = chart()
                    .dateRange(dateRange)
                    .isLoading(true);
                const container = drawInNewContainer(loadingChart);
                const brushGroupOf = (parent) =>
                    parent.node().querySelector('.brush-group');
                const expected = d3.brushSelection(
                    brushGroupOf(
                        drawInNewContainer(chart().dateRange(dateRange))
                    )
                );

                container.call(loadingChart.isLoading(false));

                const actual = d3.brushSelection(brushGroupOf(container));

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('when the data has negative values', () => {
        it('should draw the area across a zero baseline', () => {
            const negativeDataset = buildDataSet('withNegativeValues');

            containerFixture
                .datum(negativeDataset)
                .call(brushChart.isAnimated(false));

            const yCoordinates = yCoordinatesOf(
                containerFixture.select('.brush-area').attr('d')
            );
            // the area closes along its baseline, so the last y is where zero sits
            const baseline = yCoordinates[yCoordinates.length - 1];

            yCoordinates.forEach((y) => expect(Number.isFinite(y)).toBe(true));
            expect(Math.min(...yCoordinates)).toBeLessThan(baseline);
            expect(Math.max(...yCoordinates)).toBeGreaterThan(baseline);
        });
    });

    describe('aPI', () => {
        it('should provide animationDuration getter and setter', () => {
            let defaultAnimationDuration = brushChart.animationDuration(),
                testAnimationDuration = 2000,
                newAnimationDuration;

            brushChart.animationDuration(testAnimationDuration);
            newAnimationDuration = brushChart.animationDuration();

            expect(defaultAnimationDuration).not.toBe(testAnimationDuration);
            expect(newAnimationDuration).toBe(testAnimationDuration);
        });

        it('should provide areaCurve getter and setter', () => {
            let previous = brushChart.areaCurve(),
                expected = 'step',
                actual;

            brushChart.areaCurve(expected);
            actual = brushChart.areaCurve();

            expect(previous).not.toEqual(expected);
            expect(actual).toEqual(expected);
        });

        it('should provide a bush date range getter and setter', () => {
            let previous = brushChart.dateRange(),
                expected = ['9/15/2015', '1/25/2016'],
                actual;

            brushChart.dateRange(expected);
            actual = brushChart.dateRange();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        describe('when the date range is set before the first render', () => {
            const dateRange = ['7/10/2015', '7/20/2015'];
            let fixture;

            beforeEach(() => {
                fixture = document.createElement('div');
                document.body.appendChild(fixture);
            });

            afterEach(() => {
                document.body.removeChild(fixture);
            });

            const selectionOf = (container) =>
                d3.brushSelection(container.select('.brush-group').node());

            it('should not throw', () => {
                const earlyChart = chart().dateRange(dateRange);

                expect(() =>
                    d3.select(fixture).datum(dataset).call(earlyChart)
                ).not.toThrow();
            });

            it('should draw the window it was given', () => {
                const early = d3.select(fixture).append('div');
                const late = d3.select(fixture).append('div');
                const lateChart = chart();

                early.datum(dataset).call(chart().dateRange(dateRange));
                late.datum(dataset).call(lateChart);
                lateChart.dateRange(dateRange);

                expect(selectionOf(early)).not.toBeNull();
                expect(selectionOf(early)).toEqual(selectionOf(late));
            });

            it.each([[null], [undefined]])(
                'should draw without a selection when it is %s',
                (emptyRange) => {
                    const container = d3.select(fixture).append('div');
                    const expected = null;

                    expect(() =>
                        container
                            .datum(dataset)
                            .call(chart().dateRange(emptyRange))
                    ).not.toThrow();

                    const actual = selectionOf(container);

                    expect(actual).toEqual(expected);
                }
            );

            it('should forget a range that is then emptied', () => {
                const container = d3.select(fixture).append('div');
                const expected = null;

                expect(() =>
                    container
                        .datum(dataset)
                        .call(chart().dateRange(dateRange).dateRange(null))
                ).not.toThrow();

                const actual = selectionOf(container);

                expect(actual).toEqual(expected);
            });
        });

        it('should provide a gradient getter and setter', () => {
            let previous = brushChart.gradient(),
                expected = ['#ffffff', '#fafefc'],
                actual;

            brushChart.gradient(expected);
            actual = brushChart.gradient();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide height getter and setter', () => {
            let previous = brushChart.height(),
                expected = 200,
                actual;

            brushChart.height(expected);
            actual = brushChart.height();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide isAnimated getter and setter', () => {
            let previous = brushChart.isAnimated(),
                expected = true,
                actual;

            brushChart.isAnimated(expected);
            actual = brushChart.isAnimated();

            expect(previous).not.toEqual(expected);
            expect(actual).toEqual(expected);
        });

        it('should provide isLocked getter and setter', () => {
            let previous = brushChart.isLocked(),
                expected = true,
                actual;

            brushChart.isLocked(expected);
            actual = brushChart.isLocked();

            expect(previous).not.toEqual(expected);
            expect(actual).toEqual(expected);
        });

        it('should provide isLoading getter and setter', () => {
            let previous = brushChart.isLoading(),
                expected = true,
                actual;

            brushChart.isLoading(expected);
            actual = brushChart.isLoading();

            expect(previous).not.toBe(actual);
            expect(actual).toBe(expected);
        });

        describe('margin', () => {
            it('should provide margin getter and setter', () => {
                let previous = brushChart.margin(),
                    expected = { top: 4, right: 4, bottom: 4, left: 4 },
                    actual;

                brushChart.margin(expected);
                actual = brushChart.margin();

                expect(previous).not.toBe(expected);
                expect(actual).toEqual(expected);
            });

            describe('when margins are set partially', () => {
                it('should override the default values', () => {
                    let previous = brushChart.margin(),
                        expected = {
                            ...previous,
                            top: 10,
                            right: 20,
                        },
                        actual;

                    brushChart.margin({ top: 10, right: 20 });
                    actual = brushChart.margin();

                    expect(previous).not.toBe(actual);
                    expect(actual).toEqual(expected);
                });

                it('should draw the chart inside the new margins', () => {
                    const expected = 'translate(20, 10)';
                    const actual = drawInNewContainer(
                        chart().margin({ top: 10 })
                    )
                        .select('.container-group')
                        .attr('transform');

                    expect(actual).toEqual(expected);
                });
            });
        });

        it('should provide width getter and setter', () => {
            let previous = brushChart.width(),
                expected = 200,
                actual;

            brushChart.width(expected);
            actual = brushChart.width();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should pass the locale to the x axis tick formatter', () => {
            // A getter/setter pair for `locale` passes trivially, even when the
            // accessor stores the value and `getTimeSeriesAxis` never receives
            // it, so the axis formats in d3's default English. Asserting the
            // rendered tick text is the point.
            //
            // Own container and own data rather than the shared
            // `containerFixture` and the file-scope `dataset` that the nested
            // beforeEach blocks reassign -- leaning on those makes a test pass
            // alone and fail in the full suite.
            const localeFixture =
                '<div id="locale-fixture"><div class="default-locale"></div><div class="german-locale"></div></div>';

            document.body.insertAdjacentHTML('afterbegin', localeFixture);

            const localeDataset = buildDataSet('withSimpleData');
            const readTicks = (selector) =>
                d3
                    .select(selector)
                    .selectAll('.x.axis .tick text')
                    .nodes()
                    .map((node) => node.textContent);

            d3.select('.default-locale')
                .datum(localeDataset)
                .call(chart().xAxisFormat('day-month'));

            d3.select('.german-locale')
                .datum(buildDataSet('withSimpleData'))
                .call(chart().xAxisFormat('day-month').locale('de-DE'));

            const defaultTicks = readTicks('.default-locale');
            const germanTicks = readTicks('.german-locale');

            document.body.removeChild(
                document.getElementById('locale-fixture')
            );

            // Both axes rendered, so a difference below is a formatting
            // difference rather than one chart failing to draw.
            expect(defaultTicks.length).toBeGreaterThan(0);
            expect(germanTicks.length).toBe(defaultTicks.length);
            expect(germanTicks).not.toEqual(defaultTicks);
        });

        it('should provide a xAxisFormat getter and setter', () => {
            let previous = brushChart.xAxisFormat(),
                expected = brushChart.axisTimeCombinations.HOUR_DAY,
                actual;

            brushChart.xAxisFormat(expected);
            actual = brushChart.xAxisFormat();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide a xAxisCustomFormat getter and setter', () => {
            let previous = brushChart.xAxisCustomFormat(),
                expected = '%d %b',
                actual;

            brushChart.xAxisCustomFormat(expected);
            actual = brushChart.xAxisCustomFormat();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide a xTicks getter and setter', () => {
            let previous = brushChart.xTicks(),
                expected = 2,
                actual;

            brushChart.xTicks(expected);
            actual = brushChart.xTicks();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide locale getter and setter', () => {
            let previous = brushChart.locale(),
                expected = 'en-US',
                actual;

            brushChart.locale(expected);
            actual = brushChart.locale();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide a roundingTimeInterval getter and setter', () => {
            let previous = brushChart.roundingTimeInterval(),
                expected = 'timeMillisecond',
                actual;

            brushChart.roundingTimeInterval(expected);
            actual = brushChart.roundingTimeInterval();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });
    });

    describe('when the x axis has a custom format', () => {
        const tickText = (container, selector) =>
            container
                .selectAll(`${selector} .tick text`)
                .nodes()
                .map((node) => node.textContent);

        it('should format the ticks with xAxisCustomFormat', () => {
            const customChart = chart()
                .xAxisFormat('custom')
                .xAxisCustomFormat('%Y');
            const container = drawInNewContainer(customChart);
            const expected = ['2015'];
            const actual = [...new Set(tickText(container, '.axis.x'))];

            expect(actual).toEqual(expected);
        });

        it('should not draw the month axis', () => {
            const customChart = chart()
                .xAxisFormat('custom')
                .xAxisCustomFormat('%Y');
            const container = drawInNewContainer(customChart);
            const expected = 0;
            const actual = tickText(container, '.axis.sub-x').length;

            expect(actual).toEqual(expected);
        });

        describe('when the format changes after the first render', () => {
            const customFormat = (chartToFormat) =>
                chartToFormat.xAxisFormat('custom').xAxisCustomFormat('%Y');

            it('should clear the month axis', () => {
                const switchedChart = chart();
                const container = drawInNewContainer(switchedChart);
                const expected = 0;

                container.call(customFormat(switchedChart));

                const actual = tickText(container, '.axis.sub-x').length;

                expect(actual).toEqual(expected);
            });

            it('should draw the month axis again when switching back', () => {
                const switchedChart = chart();
                const container = drawInNewContainer(switchedChart);
                const expected = tickText(container, '.axis.sub-x');

                container.call(customFormat(switchedChart));
                container.call(switchedChart.xAxisFormat(null));

                const actual = tickText(container, '.axis.sub-x');

                expect(actual.length).toBeGreaterThan(0);
                expect(actual).toEqual(expected);
            });
        });

        it('should ask d3 for the number of ticks in xTicks', () => {
            const customChart = (ticks) =>
                chart()
                    .xAxisFormat('custom')
                    .xAxisCustomFormat('%d')
                    .xTicks(ticks);
            const few = drawInNewContainer(customChart(2));
            const many = drawInNewContainer(customChart(20));
            const actual = tickText(few, '.axis.x').length;
            const expected = tickText(many, '.axis.x').length;

            expect(actual).toBeLessThan(expected);
        });

        describe('when xAxisCustomFormat is not set', () => {
            it('should fall back to the d3 default tick format', () => {
                const container = drawInNewContainer(
                    chart().xAxisFormat('custom')
                );
                const expected = 'July';
                const actual = tickText(container, '.axis.x');

                expect(actual).toContain(expected);
            });

            it('should not draw the month axis', () => {
                const container = drawInNewContainer(
                    chart().xAxisFormat('custom')
                );
                const expected = 0;
                const actual = tickText(container, '.axis.sub-x').length;

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('gradient', () => {
        it('should colour the stops with the gradient that was set', () => {
            const expected = ['#ffffff', '#fafefc'];
            const container = drawInNewContainer(chart().gradient(expected));
            const actual = container
                .selectAll('linearGradient stop')
                .nodes()
                .map((stop) => stop.getAttribute('stop-color'));

            expect(actual).toEqual(expected);
        });

        it('should span the width of the chart', () => {
            const expected = '160';
            const container = drawInNewContainer(chart().width(200));
            const actual = container.select('linearGradient').attr('x2');

            expect(actual).toEqual(expected);
        });

        it('should fill the brush selection', () => {
            const container = drawInNewContainer(chart());
            const gradientId = container.select('linearGradient').attr('id');
            const expected = `url(#${gradientId})`;
            const actual = container.select('.selection').attr('fill');

            expect(actual).toEqual(expected);
        });

        describe('when the chart redraws with a new gradient and width', () => {
            const newGradient = ['#111111', '#222222'];
            let redrawnChart, container;

            beforeEach(() => {
                redrawnChart = chart();
                container = drawInNewContainer(redrawnChart);

                container.call(redrawnChart.gradient(newGradient).width(500));
            });

            it('should colour the stops with the new gradient', () => {
                const expected = newGradient;
                const actual = container
                    .selectAll('linearGradient stop')
                    .nodes()
                    .map((stop) => stop.getAttribute('stop-color'));

                expect(actual).toEqual(expected);
            });

            it('should span the new width', () => {
                const expected = '460';
                const actual = container.select('linearGradient').attr('x2');

                expect(actual).toEqual(expected);
            });

            it('should extend the x axis line to the new width', () => {
                const expected = '460';
                const actual = container.select('.extended-x-line').attr('x2');

                expect(actual).toEqual(expected);
            });

            it('should not add a second gradient', () => {
                const expected = 1;
                const actual = container.selectAll('linearGradient').size();

                expect(actual).toEqual(expected);
            });

            it('should not add a second x axis line', () => {
                const expected = 1;
                const actual = container.selectAll('.extended-x-line').size();

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('accessibility', () => {
        it('should provide a11yTitle getter and setter', () => {
            let previous = brushChart.a11yTitle(),
                expected = 'Visits per day',
                actual;

            brushChart.a11yTitle(expected);
            actual = brushChart.a11yTitle();

            expect(previous).toBeNull();
            expect(actual).toEqual(expected);
        });

        it('should provide a11yDescription getter and setter', () => {
            let previous = brushChart.a11yDescription(),
                expected = 'Visits grew through July',
                actual;

            brushChart.a11yDescription(expected);
            actual = brushChart.a11yDescription();

            expect(previous).toBeNull();
            expect(actual).toEqual(expected);
        });

        it('should provide a11yDataTable getter and setter', () => {
            let previous = brushChart.a11yDataTable(),
                expected = false,
                actual;

            brushChart.a11yDataTable(expected);
            actual = brushChart.a11yDataTable();

            expect(previous).toEqual(true);
            expect(actual).toEqual(expected);
        });

        it('should be announced as a brush chart by default', () => {
            const expected = 'Brush chart';
            const actual = drawInNewContainer(chart())
                .select('svg')
                .attr('aria-label');

            expect(actual).toEqual(expected);
        });

        it('should be announced with the a11yTitle', () => {
            const expected = 'Visits per day';
            const actual = drawInNewContainer(chart().a11yTitle(expected))
                .select('svg')
                .attr('aria-label');

            expect(actual).toEqual(expected);
        });

        it('should describe the chart with the a11yDescription', () => {
            const expected = 'Visits grew through July';
            const actual = drawInNewContainer(chart().a11yDescription(expected))
                .select('svg desc')
                .text();

            expect(actual).toEqual(expected);
        });

        it('should render a row per entry in the data table', () => {
            const expected = buildDataSet('withSimpleData').length;
            const actual = drawInNewContainer(chart())
                .selectAll('.britechart-data-table tbody tr')
                .size();

            expect(actual).toEqual(expected);
        });

        it('should leave a missing value empty in the data table', () => {
            const missingDataset = buildDataSet('withMissingData');
            const missingIndex = missingDataset.findIndex(
                ({ value }) => value === null
            );
            const expected = '';
            const actual = drawInNewContainer(chart(), missingDataset)
                .selectAll('.britechart-data-table tbody tr td')
                .nodes()[missingIndex].textContent;

            expect(actual).toEqual(expected);
        });

        it('should not render the data table when a11yDataTable is false', () => {
            const expected = 0;
            const actual = drawInNewContainer(chart().a11yDataTable(false))
                .selectAll('.britechart-data-table')
                .size();

            expect(actual).toEqual(expected);
        });

        it('should not render the data table while loading', () => {
            const expected = 0;
            const actual = drawInNewContainer(chart().isLoading(true))
                .selectAll('.britechart-data-table')
                .size();

            expect(actual).toEqual(expected);
        });
    });

    describe('when animated', () => {
        const stubReducedMotion = (matches) =>
            vi.stubGlobal('matchMedia', (query) => ({
                matches:
                    matches && query === '(prefers-reduced-motion: reduce)',
            }));
        const animatedChart = () =>
            chart().isAnimated(true).animationDuration(1);
        const pathOf = (container, selector) =>
            container.select(selector).attr('d');
        const brushOpacity = (container) =>
            container.node().querySelector('.brush-group').style.opacity;
        // Leaves no transition to tick on a fixture that is already gone
        const animationToFinish = (container) =>
            vi.waitFor(() => {
                expect(brushOpacity(container)).toEqual('1');
            });

        afterEach(() => {
            vi.unstubAllGlobals();
        });

        describe('when the reader does not prefer reduced motion', () => {
            beforeEach(() => {
                stubReducedMotion(false);
            });

            it('should start the area flat on its baseline', async () => {
                const container = drawInNewContainer(animatedChart());
                const expected = 1;
                const actual = new Set(
                    yCoordinatesOf(pathOf(container, '.brush-area'))
                ).size;

                expect(actual).toEqual(expected);

                await animationToFinish(container);
            });

            it('should grow the area to its values', async () => {
                const container = drawInNewContainer(animatedChart());
                const expected = pathOf(
                    drawInNewContainer(chart()),
                    '.brush-area'
                );

                await vi.waitFor(() => {
                    expect(pathOf(container, '.brush-area')).toEqual(expected);
                });
                await animationToFinish(container);
            });

            it('should fade the brush in', async () => {
                const container = drawInNewContainer(animatedChart());
                const expected = '0';
                const actual = brushOpacity(container);

                expect(actual).toEqual(expected);

                await animationToFinish(container);
            });

            describe('when the data has gaps', () => {
                it('should start the missing data area flat', async () => {
                    const container = drawInNewContainer(
                        animatedChart(),
                        buildDataSet('withMissingData')
                    );
                    const expected = 1;
                    const actual = new Set(
                        yCoordinatesOf(pathOf(container, '.missing-brush-area'))
                    ).size;

                    expect(actual).toEqual(expected);

                    await animationToFinish(container);
                });

                it('should grow the missing data area to its values', async () => {
                    const container = drawInNewContainer(
                        animatedChart(),
                        buildDataSet('withMissingData')
                    );
                    const expected = pathOf(
                        drawInNewContainer(
                            chart(),
                            buildDataSet('withMissingData')
                        ),
                        '.missing-brush-area'
                    );

                    await vi.waitFor(() => {
                        expect(
                            pathOf(container, '.missing-brush-area')
                        ).toEqual(expected);
                    });
                    await animationToFinish(container);
                });
            });
        });

        describe('when the reader prefers reduced motion', () => {
            beforeEach(() => {
                stubReducedMotion(true);
            });

            it('should draw the area at its values at once', () => {
                const expected = pathOf(
                    drawInNewContainer(chart()),
                    '.brush-area'
                );
                const actual = pathOf(
                    drawInNewContainer(animatedChart()),
                    '.brush-area'
                );

                expect(actual).toEqual(expected);
            });

            it('should not fade the brush in', () => {
                const expected = '';
                const actual = brushOpacity(
                    drawInNewContainer(animatedChart())
                );

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('brush events', () => {
        const dateWindow = ['2015-07-01T00:00:00Z', '2015-07-11T00:00:00Z'];
        const lockedWindowWidth = 255;
        let startSpy, endSpy;

        // jsdom has no layout, so the pointer position falls back to clientX:
        // these drive d3-brush's real listeners and say nothing about where a
        // selection lands on screen, which packages/integration/tests/brush.spec.js
        // checks in a browser. `view` is defined afterwards because the
        // MouseEvent constructor rejects vitest's `window`, which is not the
        // jsdom Window object.
        const mouseEvent = (type, clientX) => {
            const event = new MouseEvent(type, { bubbles: true, clientX });

            Object.defineProperty(event, 'view', { value: window });

            return event;
        };
        const press = (container, target, x) =>
            container
                .node()
                .querySelector(target)
                .dispatchEvent(mouseEvent('mousedown', x));
        const moveTo = (x) => window.dispatchEvent(mouseEvent('mousemove', x));
        const release = (x) => window.dispatchEvent(mouseEvent('mouseup', x));
        const drag = (container, from, to, target = '.overlay') => {
            press(container, target, from);
            moveTo(to);
            release(to);
        };
        const click = (container, x) => {
            press(container, '.overlay', x);
            release(x);
        };
        // Read off the node: `selection.select` would overwrite the datum d3-brush
        // keeps on the group's children
        const selectionOf = (container) =>
            d3.brushSelection(container.node().querySelector('.brush-group'));
        const toDays = (dates) => dates.map((date) => date.toISOString());
        const listeningChart = () =>
            chart()
                .on('customBrushStart', startSpy)
                .on('customBrushEnd', endSpy);

        beforeEach(() => {
            startSpy = vi.fn();
            endSpy = vi.fn();
        });

        afterEach(() => {
            d3.selectAll('.brush-group').interrupt();
        });

        describe('when a window is dragged', () => {
            it('should fire customBrushStart with the dates under the pointer', () => {
                const container = drawInNewContainer(listeningChart());
                const expected = [
                    '2015-07-01T04:54:46.956Z',
                    '2015-07-09T00:44:20.869Z',
                ];

                drag(container, 100, 300);

                const actual = toDays(startSpy.mock.calls[0][0]);

                expect(actual).toEqual(expected);
            });

            it('should fire customBrushEnd with the window rounded to days', () => {
                const container = drawInNewContainer(listeningChart());
                const expected = [
                    '2015-07-01T00:00:00.000Z',
                    '2015-07-09T00:00:00.000Z',
                ];

                drag(container, 100, 300);

                const actual = toDays(endSpy.mock.calls[0][0]);

                expect(actual).toEqual(expected);
            });

            it('should round to the roundingTimeInterval', () => {
                const container = drawInNewContainer(
                    listeningChart().roundingTimeInterval('timeHour')
                );
                const expected = [
                    '2015-07-01T05:00:00.000Z',
                    '2015-07-09T01:00:00.000Z',
                ];

                drag(container, 100, 300);

                const actual = toDays(endSpy.mock.calls[0][0]);

                expect(actual).toEqual(expected);
            });

            it('should ease the window to the rounded days', async () => {
                const container = drawInNewContainer(listeningChart());
                const expected = selectionOf(
                    drawInNewContainer(
                        chart().dateRange([
                            '2015-07-01T00:00:00Z',
                            '2015-07-09T00:00:00Z',
                        ])
                    )
                );

                drag(container, 100, 300);

                await vi.waitFor(() => {
                    expect(selectionOf(container)).toEqual(expected);
                });
            });

            it('should not fire customBrushEnd again when the rounding finishes', async () => {
                const container = drawInNewContainer(listeningChart());
                const expected = 1;

                drag(container, 100, 300);
                await vi.waitFor(() => {
                    expect(selectionOf(container)[0]).not.toEqual(100);
                });
                d3.selectAll('.brush-group').interrupt();

                const actual = endSpy.mock.calls.length;

                expect(actual).toEqual(expected);
            });

            describe('when the window rounds to nothing', () => {
                it('should widen it to one whole interval', () => {
                    const container = drawInNewContainer(listeningChart());
                    const expected = [
                        '2015-07-01T00:00:00.000Z',
                        '2015-07-02T00:00:00.000Z',
                    ];

                    drag(container, 100, 102);

                    const actual = toDays(endSpy.mock.calls[0][0]);

                    expect(actual).toEqual(expected);
                });
            });
        });

        describe('when the brush is clicked without dragging', () => {
            it('should fire customBrushEnd without dates', () => {
                const container = drawInNewContainer(listeningChart());
                const expected = [null, null];

                click(container, 100);

                const actual = endSpy.mock.calls[0][0];

                expect(actual).toEqual(expected);
            });

            it('should leave no selection', () => {
                const container = drawInNewContainer(listeningChart());
                const expected = null;

                click(container, 100);

                const actual = selectionOf(container);

                expect(actual).toEqual(expected);
            });
        });

        describe('when dateRange moves the brush', () => {
            it('should fire customBrushStart with the new dates', () => {
                const movedChart = listeningChart();

                drawInNewContainer(movedChart);
                movedChart.dateRange(dateWindow);

                // The scale's round trip through pixels can lose a millisecond
                const toSeconds = (dates) =>
                    dates.map((date) => Math.round(+new Date(date) / 1000));
                const expected = toSeconds(dateWindow);
                const actual = toSeconds(startSpy.mock.calls[0][0]);

                expect(actual).toEqual(expected);
            });

            it('should not fire customBrushEnd, as there was no gesture', () => {
                const movedChart = listeningChart();

                drawInNewContainer(movedChart);
                movedChart.dateRange(dateWindow);

                const expected = 0;
                const actual = endSpy.mock.calls.length;

                expect(actual).toEqual(expected);
            });

            describe('when the end date is not after the start date', () => {
                let errorSpy, moved, container;

                beforeEach(() => {
                    errorSpy = vi
                        .spyOn(console, 'error')
                        .mockImplementation(() => {});
                    moved = listeningChart();
                    container = drawInNewContainer(moved.dateRange(dateWindow));
                    startSpy.mockClear();

                    moved.dateRange([dateWindow[1], dateWindow[0]]);
                });

                afterEach(() => {
                    errorSpy.mockRestore();
                });

                it('should log an error', () => {
                    const expected =
                        'dateRange Error: End date should be posterior to startDate!';
                    const actual = errorSpy.mock.calls[0][0];

                    expect(actual).toEqual(expected);
                });

                it('should clear the selection', () => {
                    const expected = null;
                    const actual = selectionOf(container);

                    expect(actual).toEqual(expected);
                });

                it('should not fire customBrushStart', () => {
                    const expected = 0;
                    const actual = startSpy.mock.calls.length;

                    expect(actual).toEqual(expected);
                });

                it('should not log the error again on a redraw', () => {
                    const expected = 1;

                    container.call(moved);

                    const actual = errorSpy.mock.calls.length;

                    expect(actual).toEqual(expected);
                });
            });
        });

        describe('when the chart redraws', () => {
            // A wider span than `withSimpleData`, so the same dates fall on
            // different pixels
            const widerData = [
                { date: '2015-06-01T00:00:00Z', value: 1 },
                { date: '2015-08-31T00:00:00Z', value: 2 },
            ];
            const windowOn = (range, data) =>
                selectionOf(drawInNewContainer(chart().dateRange(range), data));
            let errorSpy;

            beforeEach(() => {
                errorSpy = vi
                    .spyOn(console, 'error')
                    .mockImplementation(() => {});
            });

            afterEach(() => {
                errorSpy.mockRestore();
            });

            describe('when a date range is set', () => {
                it('should place the window on it against the new data', () => {
                    const redrawnChart = listeningChart().dateRange(dateWindow);
                    const container = drawInNewContainer(redrawnChart);
                    const expected = windowOn(dateWindow, widerData);

                    container.datum(widerData).call(redrawnChart);

                    const actual = selectionOf(container);

                    expect(actual).toEqual(expected);
                });

                it('should place the window on it at the new width', () => {
                    const redrawnChart = listeningChart().dateRange(dateWindow);
                    const container = drawInNewContainer(redrawnChart);
                    const expected = selectionOf(
                        drawInNewContainer(
                            chart().dateRange(dateWindow).width(500)
                        )
                    );

                    container.call(redrawnChart.width(500));

                    const actual = selectionOf(container);

                    expect(actual).toEqual(expected);
                });

                it('should not fire any event', () => {
                    const redrawnChart = listeningChart().dateRange(dateWindow);
                    const container = drawInNewContainer(redrawnChart);
                    const expected = 0;

                    startSpy.mockClear();
                    container.datum(widerData).call(redrawnChart);

                    const actual =
                        startSpy.mock.calls.length + endSpy.mock.calls.length;

                    expect(actual).toEqual(expected);
                });
            });

            describe('when the window was dragged', () => {
                const draggedWindow = [
                    '2015-07-01T00:00:00.000Z',
                    '2015-07-09T00:00:00.000Z',
                ];
                let redrawnChart, container;

                beforeEach(() => {
                    redrawnChart = listeningChart();
                    container = drawInNewContainer(redrawnChart);

                    drag(container, 100, 300);
                });

                it('should report the dragged window in dateRange', () => {
                    const expected = draggedWindow;
                    const actual = redrawnChart.dateRange();

                    expect(actual).toEqual(expected);
                });

                it('should keep the dragged window', () => {
                    const expected = windowOn(draggedWindow, widerData);

                    container.datum(widerData).call(redrawnChart);

                    const actual = selectionOf(container);

                    expect(actual).toEqual(expected);
                });

                it('should not fire any event', () => {
                    const expected = 0;

                    startSpy.mockClear();
                    endSpy.mockClear();
                    container.datum(widerData).call(redrawnChart);

                    const actual =
                        startSpy.mock.calls.length + endSpy.mock.calls.length;

                    expect(actual).toEqual(expected);
                });

                it('should stop the rounding that was under way', async () => {
                    const expected = windowOn(draggedWindow, widerData);

                    container.datum(widerData).call(redrawnChart);
                    startSpy.mockClear();
                    await new Promise((resolve) => setTimeout(resolve, 300));

                    const actual = selectionOf(container);

                    expect(actual).toEqual(expected);
                    expect(startSpy).not.toHaveBeenCalled();
                });
            });

            describe('when the window was dragged from the edge of the data', () => {
                // The data starts and ends at 07:00, and rounding to days
                // moves that to midnight
                const firstDate = '2015-06-27T07:00:00.000Z';

                it('should report dates inside the data', () => {
                    const container = drawInNewContainer(listeningChart());
                    const expected = firstDate;

                    drag(container, 0, 100);

                    const actual = toDays(endSpy.mock.calls[0][0])[0];

                    expect(actual).toEqual(expected);
                });

                it('should keep the window through a redraw', () => {
                    const redrawnChart = listeningChart();
                    const container = drawInNewContainer(redrawnChart);

                    drag(container, 0, 100);

                    const expected = windowOn(
                        toDays(endSpy.mock.calls[0][0]),
                        buildDataSet('withSimpleData')
                    );

                    container.call(redrawnChart);

                    const actual = selectionOf(container);

                    expect(actual).not.toBeNull();
                    expect(actual).toEqual(expected);
                });
            });

            describe('when the selection was cleared with a click', () => {
                let redrawnChart, container;

                beforeEach(() => {
                    redrawnChart = listeningChart().dateRange(dateWindow);
                    container = drawInNewContainer(redrawnChart);

                    click(container, 800);
                });

                it('should reset dateRange', () => {
                    const expected = [null, null];
                    const actual = redrawnChart.dateRange();

                    expect(actual).toEqual(expected);
                });

                it('should leave no selection', () => {
                    const expected = null;

                    container.call(redrawnChart);

                    const actual = selectionOf(container);

                    expect(actual).toEqual(expected);
                });
            });

            describe('when customBrushStart itself redraws the chart', () => {
                it('should keep the window being dragged', () => {
                    const redrawnChart = listeningChart();
                    const container = drawInNewContainer(redrawnChart);
                    const expected = [
                        '2015-07-01T00:00:00.000Z',
                        '2015-07-09T00:00:00.000Z',
                    ];

                    startSpy.mockImplementation(() =>
                        container.call(redrawnChart)
                    );
                    drag(container, 100, 300);

                    const actual = toDays(endSpy.mock.calls[0][0]);

                    expect(actual).toEqual(expected);
                });
            });

            describe('when the date range falls outside the new data', () => {
                const otherData = buildDataSet('withShortData');
                let redrawnChart, container;

                beforeEach(() => {
                    redrawnChart = listeningChart().dateRange(dateWindow);
                    container = drawInNewContainer(redrawnChart);
                    startSpy.mockClear();

                    container.datum(otherData).call(redrawnChart);
                });

                it('should clear the selection', () => {
                    const expected = null;
                    const actual = selectionOf(container);

                    expect(actual).toEqual(expected);
                });

                it('should not log an error', () => {
                    expect(errorSpy).not.toHaveBeenCalled();
                });

                it('should not fire customBrushStart', () => {
                    expect(startSpy).not.toHaveBeenCalled();
                });

                it('should keep the date range', () => {
                    const expected = dateWindow;
                    const actual = redrawnChart.dateRange();

                    expect(actual).toEqual(expected);
                });

                it('should draw the window again when the data holds it', () => {
                    const expected = windowOn(dateWindow, widerData);

                    container.datum(widerData).call(redrawnChart);

                    const actual = selectionOf(container);

                    expect(actual).toEqual(expected);
                });
            });

            describe('when the date range is partly outside the new data', () => {
                it('should clear the selection', () => {
                    const redrawnChart = listeningChart().dateRange(dateWindow);
                    const container = drawInNewContainer(redrawnChart);
                    const expected = null;

                    container
                        .datum([
                            { date: '2015-07-05T00:00:00Z', value: 1 },
                            { date: '2015-07-25T00:00:00Z', value: 2 },
                        ])
                        .call(redrawnChart);

                    const actual = selectionOf(container);

                    expect(actual).toEqual(expected);
                });
            });
        });

        describe('when the brush is locked', () => {
            const lockedChart = () =>
                listeningChart().dateRange(dateWindow).isLocked(true);

            it('should stretch a shorter window to the locked size', () => {
                const container = drawInNewContainer(lockedChart());
                const expected = [100, 100 + lockedWindowWidth];

                drag(container, 100, 120);

                const actual = selectionOf(container);

                expect(actual).toEqual(expected);
            });

            it('should shrink a longer window to the locked size', () => {
                const container = drawInNewContainer(lockedChart());
                const expected = [100, 100 + lockedWindowWidth];

                drag(container, 100, 500);

                const actual = selectionOf(container);

                expect(actual).toEqual(expected);
            });

            it('should report the locked size in customBrushStart', () => {
                const container = drawInNewContainer(lockedChart());
                const expected = '2015-07-11T04:23:28.695Z';

                startSpy.mockClear();
                drag(container, 100, 120);

                const actual = startSpy.mock.calls.at(-1)[0][1].toISOString();

                expect(actual).toEqual(expected);
            });

            it('should let the window be dragged without resizing it', () => {
                const container = drawInNewContainer(lockedChart());
                const [start, end] = selectionOf(container);
                const expected = [start + 50, end + 50];

                drag(container, 200, 250, '.selection');

                const actual = selectionOf(container);

                expect(actual).toEqual(expected);
            });

            it('should bring the window back when the brush is clicked', () => {
                const container = drawInNewContainer(lockedChart());
                const expected = selectionOf(container);

                click(container, 800);

                const actual = selectionOf(container);

                expect(actual).toEqual(expected);
            });

            describe('when the window reaches the right edge', () => {
                const chartEnd = 920;
                const lastDate = new Date('2015-08-02T07:00:00.000Z');

                it('should slide back to stay inside the chart', () => {
                    const container = drawInNewContainer(lockedChart());
                    const expected = [chartEnd - lockedWindowWidth, chartEnd];

                    drag(container, 800, 850);

                    const actual = selectionOf(container);

                    expect(actual).toEqual(expected);
                });

                it('should report dates inside the data', () => {
                    const container = drawInNewContainer(lockedChart());

                    startSpy.mockClear();
                    drag(container, 800, 850);

                    const reported = [
                        ...startSpy.mock.calls,
                        ...endSpy.mock.calls,
                    ].flatMap(([dates]) => dates);

                    expect(reported.length).toBeGreaterThan(0);
                    reported.forEach((date) =>
                        expect(+date).toBeLessThanOrEqual(+lastDate)
                    );
                });
            });

            describe('when the date range is wider than the chart', () => {
                it('should fill the chart', () => {
                    const container = drawInNewContainer(
                        listeningChart()
                            .dateRange([
                                '2015-01-01T00:00:00Z',
                                '2016-01-01T00:00:00Z',
                            ])
                            .isLocked(true)
                    );
                    const expected = [0, 920];

                    drag(container, 100, 120);

                    const actual = selectionOf(container);

                    expect(actual).toEqual(expected);
                });
            });

            describe('when rounding each end would shorten the window', () => {
                // On this start the first end rounds up and the second down,
                // a day apart from where the window's length puts them
                const tenDays = 10 * 24 * 60 * 60 * 1000;
                const lengthOf = ([start, end]) =>
                    +new Date(end) - +new Date(start);

                it('should report the locked length in customBrushEnd', () => {
                    const container = drawInNewContainer(lockedChart());
                    const expected = tenDays;

                    drag(container, 108, 120);

                    const actual = lengthOf(endSpy.mock.calls[0][0]);

                    expect(actual).toEqual(expected);
                });

                it('should keep the locked length in dateRange', () => {
                    const movedChart = lockedChart();
                    const container = drawInNewContainer(movedChart);
                    const expected = tenDays;

                    drag(container, 108, 120);

                    const actual = lengthOf(movedChart.dateRange());

                    expect(actual).toEqual(expected);
                });
            });

            describe('when the date range is not in the data', () => {
                it('should not bring the window back on a click', () => {
                    const movedChart = lockedChart();
                    const container = drawInNewContainer(movedChart);
                    const expected = null;

                    container
                        .datum(buildDataSet('withShortData'))
                        .call(movedChart);
                    click(container, 800);

                    const actual = selectionOf(container);

                    expect(actual).toEqual(expected);
                });
            });
        });
    });

    describe('on', () => {
        it('should return the chart when registering a callback', () => {
            const expected = brushChart;
            const actual = brushChart.on('customBrushEnd', () => {});

            expect(actual).toBe(expected);
        });

        it('should return the callback that was registered', () => {
            const expected = () => {};

            brushChart.on('customBrushStart', expected);

            const actual = brushChart.on('customBrushStart');

            expect(actual).toBe(expected);
        });
    });

    describe('render accessor', () => {
        const target = () =>
            d3.select('#fixture').append('div').attr('class', 'render-target');

        it('should draw into a selector', () => {
            target();
            chart().render('.render-target', buildDataSet('withSimpleData'));

            const expected = 1;
            const actual = d3.selectAll('.render-target .brush-area').size();

            expect(actual).toEqual(expected);
        });

        it('should return the chart', () => {
            const renderedChart = chart();

            target();

            const view = renderedChart.render(
                '.render-target',
                buildDataSet('withSimpleData')
            );

            expect(view).toBe(renderedChart);
        });

        it('should redraw with the data it has when none is passed', () => {
            const renderedChart = chart();

            target();
            renderedChart.render(
                '.render-target',
                buildDataSet('withShortData')
            );
            renderedChart.width(400).render('.render-target');

            const expected = '400';
            const actual = d3.select('.render-target svg').attr('width');

            expect(actual).toEqual(expected);
        });

        it('should throw when the target matches no element', () => {
            const expected = 'Britecharts: no element matches ".nowhere"';

            expect(() =>
                chart().render('.nowhere', buildDataSet('withSimpleData'))
            ).toThrow(expected);
        });
    });
});
