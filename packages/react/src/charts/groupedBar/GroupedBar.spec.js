import GroupedBar from './GroupedBar';
import groupedBarData from './groupedBarChart.fixtures';
import { GroupedBarWrapper } from '@britecharts/wrappers';
import describeChartComponent from '../../../testing/chartComponentContract';

describe('grouped Bar Chart', () => {
    describeChartComponent({
        Component: GroupedBar,
        wrapper: GroupedBarWrapper,
        containerSelector: '.grouped-bar-container',
        data: groupedBarData.with3Groups,
        nextData: groupedBarData.with2Groups,
    });
});
