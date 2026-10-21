// Dashboard charts, written against britecharts 2.x
import * as d3Selection from 'd3-selection';
import line from 'britecharts/dist/umd/line.min';
import bar from 'britecharts/dist/umd/bar.min';
import 'britecharts/dist/css/britecharts.min.css';

export function drawTraffic(container, series) {
    // series: [{ id: 1, label: 'Organic', points: [{ date, visits }] }, ...]
    const lineChart = line();
    const containerSelection = d3Selection.select(container);

    lineChart
        .aspectRatio(0.5)
        .width(container.getBoundingClientRect().width)
        .grid('horizontal');

    containerSelection
        .datum({
            dataByTopic: series.map((s) => ({
                topicName: s.label,
                topic: s.id,
                dates: s.points.map((p) => ({ date: p.date, value: p.visits })),
            })),
        })
        .call(lineChart);

    return lineChart;
}

export function drawTopPages(container, pages, isLoading) {
    // pages: [{ path: '/pricing', views: 1200 }, ...]
    const barChart = bar();
    const containerSelection = d3Selection.select(container);

    if (isLoading) {
        containerSelection.html(barChart.loadingState());
        return barChart;
    }

    barChart
        .isHorizontal(true)
        .nameLabel('path')
        .valueLabel('views')
        .width(container.getBoundingClientRect().width)
        .height(400);

    containerSelection.datum(pages).call(barChart);

    return barChart;
}
