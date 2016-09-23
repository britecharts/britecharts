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
                this.serializer = serializeWithStyles.initializeSerializer();
                styles = document.createElement('style');
                styles.innerHTML = `.child{background:${randomColor};}`;
                document.body.appendChild(styles);
            });

            afterEach(() => {
                this.serializer = null;
                document.body.removeChild(styles);
            });

            it('Should expect serializer to be defined', () => {
                expect(this.serializer).toBeDefined();
            });

            it('should add styles from stylesheets to inline of element', () => {
                node = containerFixture[0];

                styledHTML = this.serializer(node).replace(' ','');

                expect(styledHTML).not.toBe(node.outerHTML.replace(' ',''));
                expect(styledHTML.indexOf(randomColor).length).not.toBe(0);
            });
        });
    });
});


