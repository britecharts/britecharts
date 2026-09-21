import Line from './Line';
import lineData from './lineChart.fixtures';
import { LineWrapper } from '@britecharts/wrappers';
import describeChartComponent from '../../../testing/chartComponentContract';

describe('Line', () => {
    describeChartComponent({
        Component: Line,
        wrapper: LineWrapper,
        containerSelector: '.line-container',
        data: () => lineData.flatData.a,
        nextData: () => lineData.flatData.b,
    });
});
