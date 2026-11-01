import React from 'react';
import type { MockInstance } from 'vitest';
import { mount } from '../../../testing/mount';

import Treemap from './Treemap';
import treemapData from './treemapChart.fixtures';
import { TreemapWrapper } from '@britecharts/wrappers';
import describeChartComponent from '../../../testing/chartComponentContract';

describe('treemap Chart', () => {
    describeChartComponent({
        Component: Treemap,
        wrapper: TreemapWrapper,
        containerSelector: '.treemap-container',
        data: treemapData.withBudget,
        nextData: treemapData.withUpdatedBudget,
    });

    describe('render', () => {
        describe('when isLoading is true', () => {
            it('should render the loading state', () => {
                const wrapper = mount(<Treemap data={[]} isLoading={true} />);

                const expected = 1;
                const actual = wrapper.findAll('.treemap-load-state').length;

                expect(actual).toEqual(expected);
            });
        });

        describe('when data passed in', () => {
            let createSpy: MockInstance<typeof TreemapWrapper.create>;

            beforeEach(() => {
                createSpy = vi.spyOn(TreemapWrapper, 'create');
            });

            afterEach(() => {
                createSpy.mockReset();
                createSpy.mockRestore();
            });

            it('should pass the treemap options to the chart', () => {
                mount(
                    <Treemap
                        chart={TreemapWrapper}
                        data={treemapData.withBudget()}
                        enableLabels={false}
                        labelsNumberFormat="$,"
                    />
                );

                const configuration = createSpy.mock.calls[0][2]!;

                expect(configuration.enableLabels).toEqual(false);
                expect(configuration.labelsNumberFormat).toEqual('$,');
            });
        });
    });
});
