import StackedBar from './StackedBar';
import stackedBarData from './stackedBarChart.fixtures';
import { StackedBarWrapper } from '@britecharts/wrappers';
import describeChartComponent from '../../../testing/chartComponentContract';

describe('stacked Bar Chart', () => {
    describeChartComponent({
        Component: StackedBar,
        wrapper: StackedBarWrapper,
        containerSelector: '.stacked-bar-container',
        data: stackedBarData.with3Sources,
        nextData: stackedBarData.with2Sources,
    });
});
