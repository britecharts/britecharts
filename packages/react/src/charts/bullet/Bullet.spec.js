import Bullet from './Bullet';
import bulletData from './bulletChart.fixtures';
import { BulletWrapper } from '@britecharts/wrappers';
import describeChartComponent from '../../../testing/chartComponentContract';

describe('bullet Chart', () => {
    describeChartComponent({
        Component: Bullet,
        wrapper: BulletWrapper,
        containerSelector: '.bullet-container',
        data: bulletData.fullTestData,
        nextData: bulletData.partialTestData,
    });
});
