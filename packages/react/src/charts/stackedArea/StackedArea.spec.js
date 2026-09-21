import StackedArea from './StackedArea';
import stackedAreaData from './stackedAreaChart.fixtures';
import { StackedAreaWrapper } from '@britecharts/wrappers';
import describeChartComponent from '../../../testing/chartComponentContract';

describe('stacked Area Chart', () => {
    describeChartComponent({
        Component: StackedArea,
        wrapper: StackedAreaWrapper,
        containerSelector: '.stacked-area-container',
        data: stackedAreaData.with3Sources,
        nextData: stackedAreaData.with2Sources,
    });
});
