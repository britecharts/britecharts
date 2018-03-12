define([
    'helpers/classes'
], function(classes) {
    'use strict';

    describe('Classes helper', () => {
        describe('classArray function', () => {
            it('should return an object with asList and asSelector functions as members', () => {
                let classArr = classes.classArray();

                expect(typeof classArr.asList === 'function').toBeTruthy();
                expect(typeof classArr.asSelector === 'function').toBeTruthy();
            });

            it('should produce a space-separated string from an input array when asList is called', () => {
                let classArr = classes.classArray(['class', 'list', 'array']);

                expect(classArr.asList()).toEqual('class list array');
            });

            it('should produce a dot separate string (with leading dot) from an input array when asSelector is called', () => {
                let classArr = classes.classArray(['class', 'list', 'array']);
              
                expect(classArr.asSelector()).toEqual('.class.list.array');
            });

            it('should work when arguments are passed as a list rather than an array', () => {
                let classArr = classes.classArray('class', 'list', 'array');

                expect(classArr.asList()).toEqual('class list array');
            });
        });
    });
});
