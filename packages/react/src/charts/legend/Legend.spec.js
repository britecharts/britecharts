import Legend from './Legend';
import legendData from './legendChart.fixtures';
import { LegendWrapper } from '@britecharts/wrappers';
import describeChartComponent from '../../../testing/chartComponentContract';

describe('legend Chart', () => {
    describeChartComponent({
        Component: Legend,
        wrapper: LegendWrapper,
        containerSelector: '.legend-container',
        data: legendData.with6Points,
        nextData: () => legendData.with6Points().slice(1),
        // A legend has no tooltip to redraw
        redrawsTooltip: false,
    });
});
