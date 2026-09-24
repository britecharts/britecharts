import React, { useEffect, useLayoutEffect } from 'react';
import { mount } from '../testing/mount';

/**
 * The hooks migration rests on two properties of this test rig. If either
 * stops being true (a testing-library or React upgrade), the conversion PRs'
 * promise of an unchanged spec file no longer holds, so fail here first and
 * loudly.
 */
describe('test harness', () => {
    describe('testing-library render', () => {
        it('should flush layout and passive effects on mount, update and unmount without act()', () => {
            const calls = [];
            const Probe = ({ n }) => {
                useLayoutEffect(() => {
                    calls.push(`layout:${n}`);

                    return () => calls.push(`layout-cleanup:${n}`);
                });
                useEffect(() => {
                    calls.push(`passive:${n}`);

                    return () => calls.push(`passive-cleanup:${n}`);
                });

                return <div />;
            };

            const wrapper = mount(<Probe n={1} />);

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

    describe('jest toEqual', () => {
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
