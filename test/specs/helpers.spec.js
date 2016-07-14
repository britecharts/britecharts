define([
    'underscore',
    'jquery',
    'd3',
    'helpers/serializeWithStyles'
    ], function (
        _,
        $,
        d3,
        serializeWithStyles,
        encoder
    ) {
    'use strict';

    let f, containerFixture, styles, node,
        randomColor = 'rgb(222,163,12)';


    describe('Helpers', () => {
        beforeEach(() => {

            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');
            containerFixture = $('.test-container');
            containerFixture.append($('<span></span>',{class:'child'}));
        });

        afterEach(() => {

            containerFixture.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        describe('serializeWithStyles', () => {
            let styledHTML;

            beforeEach(() => {
                styles = document.createElement('style');
                styles.innerHTML = `.child{background:${randomColor};}`;
                document.body.appendChild(styles);
            });

            afterEach(() => {
                document.body.removeChild(styles);
            });

            it('Should expect serializeWithStyles to be defined', () => {
                expect(serializeWithStyles).toBeDefined();
            });

            it('should add styles from stylesheets to inline of element', () => {
                node = containerFixture[0];
                styledHTML = serializeWithStyles(node).replace(' ','');
                expect(styledHTML).not.toBe(node.outerHTML.replace(' ',''));
                expect(styledHTML.indexOf(randomColor).length).not.toBe(0);
            });
        });
    });
});


