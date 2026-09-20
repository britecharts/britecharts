import React from 'react';
import { mount } from 'enzyme';

import Bar from './charts/bar/Bar';
import barData from './charts/bar/barChart.fixtures';

/**
 * Standing markers for bugs that are known and deliberately fixed much later
 * in the hooks migration. `it.failing` passes while the bug is present and
 * fails the moment it is fixed, so whoever fixes it has to come here, flip the
 * marker to `it`, and say so in the PR. Nothing else may touch these bugs.
 *
 * (The marker for ResponsiveContainer without a render prop was flipped, and
 * moved to helpers/responsive.spec.js, when it was fixed.)
 */
describe('known bugs', () => {
    // Fixed last, on its own: it is the one change that moves Chromatic
    // snapshots, because stories start honouring props they silently ignore.
    // The wrappers' setChartProperty skips every falsy value, so a chart can
    // never have isLoading, isAnimated or isHorizontal turned back off.
    describe('falsy configuration values', () => {
        it.failing(
            'should let isLoading={false} turn the loading state off',
            () => {
                const wrapper = mount(<Bar data={[]} isLoading={true} />);

                wrapper.setProps({
                    data: barData.withLetters(),
                    isLoading: false,
                });

                expect(wrapper.render().find('.bar-load-state').length).toEqual(
                    0
                );
            }
        );
    });
});
