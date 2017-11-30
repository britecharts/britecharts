define(['d3', 'legend', 'donutChartDataBuilder'], function(d3, legend, dataBuilder) {
    'use strict';

    function aTestDataSet() {
        return new dataBuilder.DonutDataBuilder();
    }

    describe('Legend Component', () =>{
        let legendChart, dataset, containerFixture, f;

        describe('when legend is vertical', () => {

            beforeEach(() =>{
                dataset = aTestDataSet()
                            .withFivePlusOther()
                            .build();
                legendChart = legend();

                // DOM Fixture Setup
                f = jasmine.getFixtures();
                f.fixturesPath = 'base/test/fixtures/';
                f.load('testContainer.html');

                containerFixture = d3.select('.test-container');
                containerFixture.datum(dataset).call(legendChart);
            });

            afterEach(() =>{
                containerFixture.remove();
                f = jasmine.getFixtures();
                f.cleanUp();
                f.clearCache();
            });

            it('should render a legend with minimal requirements', () => {
                expect(containerFixture.select('svg.britechart-legend').empty()).toBeFalsy();
            });

            it('should render container, chart and legend groups', () => {
                expect(containerFixture.select('g.legend-container-group').empty()).toBeFalsy();
                expect(containerFixture.select('g.legend-group').empty()).toBeFalsy();
            });

            it('should add a line group for each entry', () => {
                let expected = dataset.length,
                    actual = containerFixture.select('.britechart-legend')
                        .selectAll('.legend-line')
                        .size();

                expect(actual).toEqual(expected);
            });

            it('should add the proper data identifier to each entry', () => {
                let lines = containerFixture
                        .select('.britechart-legend')
                        .selectAll('.legend-entry'),
                    elements = lines.nodes();

                lines.each(function(d, index) {
                    expect(
                        parseInt(d3.select(elements[index]).attr('data-item'), 10)
                    ).toEqual(dataset[index].id);
                });
            });

            it('should add a circle for each entry', () => {
                let expected = dataset.length,
                    actual = containerFixture.select('.britechart-legend')
                        .selectAll('.legend-circle')
                        .size();

                expect(actual).toEqual(expected);
            });

            it('should add a text element for each entry', () => {
                let expected = dataset.length,
                    actual = containerFixture.select('.britechart-legend')
                        .selectAll('.legend-entry-name')
                        .size();

                expect(actual).toEqual(expected);
            });

            it('should add the proper text to each text element', () => {
                let texts = containerFixture
                        .select('.britechart-legend')
                        .selectAll('.legend-entry-name text'),
                    elements = texts[0];

                texts.each(function(d, index) {
                    expect(elements[index]).toEqual(dataset[index].name);
                });
            });

            it('should add a value element for each entry', () => {
                let expected = dataset.length,
                    actual = containerFixture.select('.britechart-legend')
                        .selectAll('.legend-entry-value')
                        .size();

                expect(actual).toEqual(expected);
            });

            it('should add the proper value to each value element', () => {
                let texts = containerFixture
                        .select('.britechart-legend')
                        .selectAll('.legend-entry-value text'),
                    elements = texts[0];

                texts.each(function(d, index) {
                    expect(elements[index]).toEqual(dataset[index]['quantity']);
                });
            });

            describe('API', function() {

                it('should provide margin getter and setter', () =>{
                    let previous = legendChart.margin(),
                        expected = {top: 4, right: 4, bottom: 4, left: 4},
                        actual;

                    legendChart.margin(expected);
                    actual = legendChart.margin();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                it('should provide margin ratio getter and setter', () =>{
                    let previous = legendChart.marginRatio(),
                        expected = 5,
                        actual;

                    legendChart.marginRatio(expected);
                    actual = legendChart.marginRatio();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                it('should provide width getter and setter', () =>{
                    let previous = legendChart.width(),
                        expected = 200,
                        actual;

                    legendChart.width(expected);
                    actual = legendChart.width();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                it('should provide height getter and setter', () =>{
                    let previous = legendChart.height(),
                        expected = 200,
                        actual;

                    legendChart.height(expected);
                    actual = legendChart.height();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                it('should provide an horizontal mode getter and setter', () =>{
                    let previous = legendChart.isHorizontal(),
                        expected = true,
                        actual;

                    legendChart.isHorizontal(expected);
                    actual = legendChart.isHorizontal();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                it('should provide colorSchema getter and setter', () =>{
                    let previous = legendChart.colorSchema(),
                        expected = ['pink', 'red', 'magenta'],
                        actual;

                    legendChart.colorSchema(expected);
                    actual = legendChart.colorSchema();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                it('should provide markerSize getter and setter', () =>{
                    let previous = legendChart.markerSize(),
                        expected = 10,
                        actual;

                    legendChart.markerSize(expected);
                    actual = legendChart.markerSize();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                it('should provide a highlight function', () => {
                    let lines = containerFixture
                            .select('.britechart-legend')
                            .selectAll('.legend-entry'),
                        elements = lines.nodes();

                    legendChart.highlight(dataset[0].id);

                    expect(d3.select(elements[0]).attr('class')).toEqual('legend-entry');
                    expect(d3.select(elements[1]).attr('class')).toEqual('legend-entry is-faded');
                    expect(d3.select(elements[2]).attr('class')).toEqual('legend-entry is-faded');
                    expect(d3.select(elements[3]).attr('class')).toEqual('legend-entry is-faded');
                    expect(d3.select(elements[4]).attr('class')).toEqual('legend-entry is-faded');
                });

                it('should provide a clear highlight function', () => {
                    let lines = containerFixture
                            .select('.britechart-legend')
                            .selectAll('.legend-entry'),
                        elements = lines.nodes();

                    legendChart.highlight(dataset[0].id);
                    legendChart.clearHighlight();

                    expect(d3.select(elements[0]).attr('class')).toEqual('legend-entry');
                    expect(d3.select(elements[1]).attr('class')).toEqual('legend-entry');
                    expect(d3.select(elements[2]).attr('class')).toEqual('legend-entry');
                    expect(d3.select(elements[3]).attr('class')).toEqual('legend-entry');
                    expect(d3.select(elements[4]).attr('class')).toEqual('legend-entry');
                });

                it('should provide numberFormat getter and setter', () =>{
                    let previous = legendChart.numberFormat(),
                        expected = 'd',
                        actual;

                    legendChart.numberFormat(expected);
                    actual = legendChart.numberFormat();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });
            });
        });

        describe('when legend is horizontal', () => {

            beforeEach(() =>{
                dataset = aTestDataSet()
                            .withThreeCategories()
                            .build();
                legendChart = legend();

                legendChart
                    .width(500)
                    .isHorizontal(true);

                // DOM Fixture Setup
                f = jasmine.getFixtures();
                f.fixturesPath = 'base/test/fixtures/';
                f.load('testContainer.html');

                containerFixture = d3.select('.test-container');
                containerFixture.datum(dataset).call(legendChart);
            });

            afterEach(() =>{
                containerFixture.remove();
                f = jasmine.getFixtures();
                f.cleanUp();
                f.clearCache();
            });

            it('should render a legend with minimal requirements', () => {
                expect(containerFixture.select('svg.britechart-legend').empty()).toBeFalsy();
            });

            it('should render container, chart and legend groups', () => {
                expect(containerFixture.select('g.legend-container-group').empty()).toBeFalsy();
                expect(containerFixture.select('g.legend-group').empty()).toBeFalsy();
            });

            it('should add only one line group', () => {
                let expected = 1,
                    actual = containerFixture
                        .select('.britechart-legend')
                        .selectAll('.legend-line')
                        .size();

                expect(actual).toEqual(expected);
            });

            it('should add one entry per data', () => {
                let expected = dataset.length,
                    actual = containerFixture
                        .select('.britechart-legend')
                        .selectAll('.legend-entry')
                        .size();

                expect(actual).toEqual(expected);
            });

            it('should add the proper data identifier to each entry', () => {
                let lines = containerFixture
                        .select('.britechart-legend')
                        .selectAll('.legend-entry'),
                    elements = lines.nodes();

                lines.each(function(d, index) {
                    expect(
                        parseInt(d3.select(elements[index]).attr('data-item'), 10)
                    ).toEqual(dataset[index].id);
                });
            });

            it('should add a circle for each entry', () => {
                let expected = dataset.length,
                    actual = containerFixture.select('.britechart-legend')
                        .selectAll('.legend-circle')
                        .size();

                expect(actual).toEqual(expected);
            });

            it('should add a text element for each entry', () => {
                let expected = dataset.length,
                    actual = containerFixture.select('.britechart-legend')
                        .selectAll('.legend-entry-name')
                        .size();

                expect(actual).toEqual(expected);
            });

            describe('when chart width is not enough for one line', () => {

                beforeEach(() =>{
                    legendChart = legend();

                    legendChart.isHorizontal(true)
                        .height(50)
                        .width(200);

                    // DOM Fixture Setup
                    f = jasmine.getFixtures();
                    f.fixturesPath = 'base/test/fixtures/';
                    f.load('testContainer.html');

                    containerFixture = d3.select('.test-container');
                    containerFixture.datum(dataset).call(legendChart);
                });

                afterEach(() =>{
                    containerFixture.remove();
                    f = jasmine.getFixtures();
                    f.cleanUp();
                    f.clearCache();
                });

                it('should create another line below', function() {
                    let expected = 2,
                        actual = containerFixture.select('.britechart-legend')
                            .selectAll('.legend-line')
                            .size();

                    expect(actual).toEqual(expected);
                });
            });
        });
    });
});
