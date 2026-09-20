/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';

import bullet from './bulletChartWrapper';

export interface BulletChartProps {
    /**
     * Internally used, do not overwrite.
     */
    data: {
        ranges: number[];
        measure: number;
    }[];

    /**
     * Gets or Sets the height of the chart
     */
    height?: number;

    /**
     * Gets or Sets the margin of the chart
     */
    margin?: { top?: number; bottom?: number; left?: number; right?: number };

    /**
     * Gets or Sets the number format of the bar chart
     * See examples in https://observablehq.com/@d3/d3-format
     */
    numberFormat?: string;

    /**
     * Gets or Sets the distance between the range labels and the chart
     */
    paddingBetweenLabelsAndChart?: number;

    /**
     * Gets or Sets the width of the chart
     */
    width?: number;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    chart?: any;
}

const getChartConfiguration = (props: BulletChartProps) => {
    let configuration: Partial<BulletChartProps> = { ...props };

    delete configuration.data;
    delete configuration.chart;

    return configuration;
};

type ChartFileType = {
    destroy: (node: HTMLElement) => void;
    create: () => ChartFileType;
    update: () => void;
} | null;

export const Bullet: React.FC<BulletChartProps> = (props) => {
    const { data, chart } = props;
    const rootRef = useRef<HTMLDivElement>(null);
    let [chartInstance, setChartInstance] = useState<ChartFileType>(null);

    useEffect(() => {
        if (!chartInstance && data !== null) {
            console.log('Bullet:::Create!');
            const chartI = chart.create(
                rootRef.current,
                data,
                getChartConfiguration(props)
            );

            // We cannot save functions using useState directly
            // See https://medium.com/swlh/how-to-store-a-function-with-the-usestate-hook-in-react-8a88dd4eede1
            setChartInstance(() => chartI);
        }

        return function cleanup() {
            console.log('Bullet:::Clean up');
            if (chartInstance && rootRef && rootRef.current) {
                console.log('Bullet:::Destroy!');
                chart.destroy(rootRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (chartInstance) {
            console.log('Bullet:::Update!');
            chart.update(
                rootRef.current,
                data,
                getChartConfiguration(props),
                chartInstance
            );
        }
    }, [data, rootRef, props]);

    return <div className="bullet-container" ref={rootRef} />;
};

Bullet.defaultProps = {
    chart: bullet,
};

export default Bullet;
