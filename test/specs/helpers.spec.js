define([
    'underscore',
    'jquery',
    'd3',
    'helpers/serializeWithStyles',
    'helpers/text',
    'helpers/common'
    ], function (
        _,
        $,
        d3,
        serializeWithStyles,
        textHelper,
        common
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
                containerFixture.append($('<span></span>',{class:'child'}));

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

        // TODO: Let's get to this tests later
        xdescribe('text wrapper', () => {

            it('should wrap the text in X lines', () => {
                let text = 'brilliant dazzling flashing',
                    fontSize = 20,
                    availableWidth = 20,
                    expected = 3;

                d3.select('.test-container')
                  .append('text')
                    .attr('dy', '.2em')
                    .text(text);

                textHelper.wrapText.call(null, fontSize, availableWidth, d3.selectAll('.test-container text').node());

                expect(d3.selectAll('.test-container value').size()).toEqual(1);
                expect(d3.selectAll('.test-container label').size()).toEqual(expected);
            });
        });

        describe('common', () => {

            it('should return true if its an integer', () => {
                expect(common.isInteger(3)).toEqual(true);
            });

            it('should return false passed a non integer', () => {
                expect(common.isInteger(3.2)).toEqual(false);
            });
        });
    });
});
