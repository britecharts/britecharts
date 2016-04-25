define([
    'underscore',
    'jquery',
    'd3',
    'bar',
    'donut',
    'line',
    'sparkline',
    'stacked-area'
    ], function (
        _,
        $,
        d3,
        barFactory,
        donutFactory,
        lineFactory,
        sparklineFactory,
        stackedAreaFactory
    ) {
        'use strict';

        var bar, donut, line, sparkline, stackedArea;


        describe('Export chart functionality', () => {

            describe('test setup', () => {

                it('should expect the charts to be defined', () => {
                    expect(barFactory).toBeDefined();
                    expect(donutFactory).toBeDefined();
                    expect(lineFactory).toBeDefined();
                    expect(sparklineFactory).toBeDefined();
                    expect(stackedAreaFactory).toBeDefined();
                });
            });

            beforeEach(() => {
                bar = barFactory();
                donut = donutFactory();
                line = lineFactory();
                sparkline = sparklineFactory();
                stackedArea = stackedAreaFactory();
            });

            afterEach(() => {

            });

            describe('Initialization', () => {
                it('Should be present on each of the charts as a method', () => {
                    expect(bar.exportChart).toBeDefined();
                    expect(donut.exportChart).toBeDefined();
                    expect(line.exportChart).toBeDefined();
                    expect(sparkline.exportChart).toBeDefined();
                    expect(stackedArea.exportChart).toBeDefined();
                });
            });

            xdescribe('Interaction', () => {
                it('should do something', () => {
                    bar.exportChart();
                });
            });
        });
    });



