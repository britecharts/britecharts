import { select } from 'd3-selection';
import type { Selection } from 'd3-selection';

import {
    fadeDuration,
    chaseDuration,
    prepareToShow,
    fadeIn,
    fadeOut,
} from './motion';

const settle = () =>
    new Promise((resolve) => setTimeout(resolve, fadeDuration + 100));

describe('tooltip motion', () => {
    // The `<g class="box">` of the fixture below, which is what the tooltip
    // passes these functions at runtime. Spelled concretely rather than as
    // `BaseType` so the specs exercise the inference a real caller gets.
    let group: Selection<SVGGElement, unknown, HTMLElement, unknown>;

    beforeEach(() => {
        document.body.insertAdjacentHTML(
            'afterbegin',
            '<div id="fixture"><svg><g class="box"></g></svg></div>'
        );
        group = select('.box');
    });

    afterEach(() => {
        const fixture = document.getElementById('fixture');

        // Asserted rather than passed straight to removeChild: if beforeEach
        // ever stops inserting it, the failure should say that.
        if (!fixture) {
            throw new Error('the fixture was not inserted');
        }

        document.body.removeChild(fixture);
    });

    it('should use one duration for fades and for the chase', () => {
        expect(fadeDuration).toEqual(chaseDuration);
    });

    it('should show the box transparent, ready to fade in', () => {
        prepareToShow(group);

        expect(group.style('visibility')).toEqual('visible');
        expect(group.style('opacity')).toEqual('0');
    });

    it('should fade in to full opacity', () => {
        prepareToShow(group);
        fadeIn(group);

        return settle().then(() => {
            expect(group.style('opacity')).toEqual('1');
        });
    });

    it('should keep the box visible while it fades out, then hide it', () => {
        prepareToShow(group);
        fadeIn(group);

        return settle()
            .then(() => {
                fadeOut(group);

                expect(group.style('visibility')).toEqual('visible');

                return settle();
            })
            .then(() => {
                expect(group.style('visibility')).toEqual('hidden');
                expect(group.style('opacity')).toEqual('0');
            });
    });

    it('should not drop to transparent when shown again during a fade out', () => {
        prepareToShow(group);
        fadeIn(group);

        return settle()
            .then(() => {
                fadeOut(group);
                prepareToShow(group);

                expect(group.style('visibility')).toEqual('visible');
                expect(group.style('opacity')).toEqual('1');

                fadeIn(group);

                return settle();
            })
            .then(() => {
                expect(group.style('visibility')).toEqual('visible');
                expect(group.style('opacity')).toEqual('1');
            });
    });
});
