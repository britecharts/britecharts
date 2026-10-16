import React, { useEffect, useLayoutEffect } from 'react';
import { mount } from '../testing/mount';

interface ProbeProps {
    n: number;
}

/**
 * Every component spec rests on two properties of this test rig. If either
 * stops being true (a testing-library or React upgrade), those specs stop
 * testing what they say they test, so fail here first and loudly.
 */
describe('test harness', () => {
    describe('testing-library render', () => {
        it('should flush layout and passive effects on mount, update and unmount without act()', () => {
            const calls: string[] = [];
            const Probe = ({ n }: ProbeProps) => {
                useLayoutEffect(() => {
                    calls.push(`layout:${n}`);

                    return () => {
                        calls.push(`layout-cleanup:${n}`);
                    };
                });
                useEffect(() => {
                    calls.push(`passive:${n}`);

                    return () => {
                        calls.push(`passive-cleanup:${n}`);
                    };
                });

                return <div />;
            };

            const wrapper = mount<ProbeProps>(<Probe n={1} />);

            expect(calls).toEqual(['layout:1', 'passive:1']);

            wrapper.setProps({ n: 2 });

            expect(calls.slice(2)).toEqual([
                'layout-cleanup:1',
                'layout:2',
                'passive-cleanup:1',
                'passive:2',
            ]);

            wrapper.unmount();

            expect(calls.slice(6)).toEqual([
                'layout-cleanup:2',
                'passive-cleanup:2',
            ]);
        });
    });

    describe('toEqual', () => {
        it('should compare detached DOM nodes structurally, not by identity', () => {
            const a = document.createElement('div');
            const same = document.createElement('div');
            const other = document.createElement('div');

            other.className = 'other';

            expect(a).toEqual(same);
            expect(a).not.toEqual(other);
        });
    });
});
