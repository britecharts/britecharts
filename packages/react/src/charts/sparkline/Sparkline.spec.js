import Sparkline from './Sparkline';
import sparklineData from './sparklineChart.fixtures';
import { SparklineWrapper } from '@britecharts/wrappers';
import describeChartComponent from '../../../testing/chartComponentContract';

describe('sparkline Chart', () => {
    describeChartComponent({
        Component: Sparkline,
        wrapper: SparklineWrapper,
        containerSelector: '.sparkline-container',
        data: sparklineData.with1Source,
        nextData: sparklineData.withLowValues,
    });
});
