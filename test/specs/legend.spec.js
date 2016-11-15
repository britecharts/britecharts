define(['d3', 'legend', 'donutChartDataBuilder'], function(d3, legend, dataBuilder) {
    'use strict';

    function aTestDataSet() {
        return new dataBuilder.DonutDataBuilder();
    }

    describe('Legend Component', () =>{
        let legendChart, dataset, containerFixture, f;

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
            let expected = 6;

            expect(
                containerFixture.select('.britechart-legend')
                    .selectAll('.legend-line')
                    .size()
            ).toEqual(expected);
        });

        it('should add the proper data identifier to each entry', () => {
            let lines = containerFixture
                    .select('.britechart-legend')
                    .selectAll('.legend-line'),
                elements = lines.nodes();

            lines.each(function(d, index) {
                expect(
                    parseInt(d3.select(elements[index]).attr('data-item'), 10)
                ).toEqual(dataset[index].id);
            });
        });

        it('should add a circle for each entry', () => {
            let expected = 6;

            expect(
                containerFixture.select('.britechart-legend')
                    .selectAll('.legend-circle')
                    .size()
            ).toEqual(expected);
        });

        it('should add a text element for each entry', () => {
            let expected = 6;

            expect(
                containerFixture.select('.britechart-legend')
                    .selectAll('.legend-entry-name')
                    .size()
            ).toEqual(expected);
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
            let expected = 6;

            expect(
                containerFixture.select('.britechart-legend')
                    .selectAll('.legend-entry-value')
                    .size()
            ).toEqual(expected);
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

            it('should provide colorScheme getter and setter', () =>{
                let previous = legendChart.colorScheme(),
                    expected = ['pink', 'red', 'magenta'],
                    actual;

                legendChart.colorScheme(expected);
                actual = legendChart.colorScheme();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide a highlight function', () => {
                let lines = containerFixture
                        .select('.britechart-legend')
                        .selectAll('.legend-line'),
                    elements = lines.nodes();

                legendChart.highlight(dataset[0].id);

                expect(d3.select(elements[0]).attr('class')).toEqual('legend-line');
                expect(d3.select(elements[1]).attr('class')).toEqual('legend-line is-faded');
                expect(d3.select(elements[2]).attr('class')).toEqual('legend-line is-faded');
                expect(d3.select(elements[3]).attr('class')).toEqual('legend-line is-faded');
                expect(d3.select(elements[4]).attr('class')).toEqual('legend-line is-faded');
            });

            it('should provide a clear highlight function', () => {
                let lines = containerFixture
                        .select('.britechart-legend')
                        .selectAll('.legend-line'),
                    elements = lines.nodes();

                legendChart.highlight(dataset[0].id);
                legendChart.clearHighlight();

                expect(d3.select(elements[0]).attr('class')).toEqual('legend-line');
                expect(d3.select(elements[1]).attr('class')).toEqual('legend-line');
                expect(d3.select(elements[2]).attr('class')).toEqual('legend-line');
                expect(d3.select(elements[3]).attr('class')).toEqual('legend-line');
                expect(d3.select(elements[4]).attr('class')).toEqual('legend-line');
            });
        });
    });
});
