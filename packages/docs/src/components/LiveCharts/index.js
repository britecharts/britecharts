import React, { useEffect, useRef, useState } from 'react';

import { version } from '../../../../core/package.json';
import styles from './styles.module.css';

// The published CDN bundle, loaded as a visitor's page would load it. The
// version is pinned because jsDelivr caches an unversioned URL for up to a
// week, which can serve a release that predates the features this page shows.
const CDN = 'https://cdn.jsdelivr.net/npm';
const CORE = `${CDN}/@britecharts/core@${version}/dist`;
const STYLES = `${CORE}/styles/bundle/britecharts.min.css`;
const SCRIPTS = [
    `${CDN}/d3-selection@3.0.0/dist/d3-selection.min.js`,
    `${CORE}/cdn/bundle/core.cdn.min.js`,
];

let loading;

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');

        script.src = src;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Could not load ${src}`));
        document.head.appendChild(script);
    });
}

/**
 * Loads Britecharts once per page, in order: d3-selection, then the core
 * bundle, which expects `d3` on the window.
 */
function loadBritecharts() {
    if (!loading) {
        const link = document.createElement('link');

        link.rel = 'stylesheet';
        link.href = STYLES;
        document.head.appendChild(link);
        loading = SCRIPTS.reduce(
            (previous, src) => previous.then(() => loadScript(src)),
            Promise.resolve()
        );
    }

    return loading;
}

const words = ['Shiny', 'Blazing', 'Glittering', 'Radiant', 'Sunny'];
const barData = words.map((name, i) => ({
    name,
    value: [12, 31, 18, 24, 15][i],
}));
const days = [
    '2026-10-19',
    '2026-10-20',
    '2026-10-21',
    '2026-10-22',
    '2026-10-23',
];
const lineData = {
    data: ['Blazing', 'Radiant'].flatMap((topicName, line) =>
        days.map((date, i) => ({
            date,
            name: line + 1,
            topicName,
            value: [
                [4, 7, 6, 9, 8],
                [3, 4, 6, 5, 7],
            ][line][i],
        }))
    ),
};

function drawBar(container) {
    const { d3, core } = window;
    const chart = core
        .bar()
        .width(container.getBoundingClientRect().width)
        .height(260)
        .a11yTitle('Uses of each word')
        .a11yDescription('Blazing is used most, Shiny least');
    const chartTooltip = core.miniTooltip().title('Uses').numberFormat('d');

    chart
        .on('customMouseOver', chartTooltip.show)
        .on('customMouseMove', chartTooltip.update)
        .on('customMouseOut', chartTooltip.hide);

    d3.select(container).datum(barData).call(chart);
    d3.select(container).select('.metadata-group').datum([]).call(chartTooltip);
}

function drawLine(container) {
    const { d3, core } = window;
    const chart = core
        .line()
        .width(container.getBoundingClientRect().width)
        .height(260)
        .grid('horizontal')
        .a11yTitle('Uses over a week');
    // The line chart sends the hovered date's values under `topics`
    const chartTooltip = core.tooltip().title('Uses').topicLabel('topics');

    chart
        .on('customMouseOver', chartTooltip.show)
        .on('customMouseMove', chartTooltip.update)
        .on('customMouseOut', chartTooltip.hide);

    d3.select(container).datum(lineData).call(chart);
    d3.select(container)
        .select('.metadata-group .hover-marker')
        .datum([])
        .call(chartTooltip);
}

/**
 * A bar chart and a line chart, drawn in the browser with the published
 * bundle, for readers to tab through and to inspect with a screen reader.
 */
export default function LiveCharts() {
    const barRef = useRef(null);
    const lineRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        loadBritecharts()
            .then(() => {
                if (isMounted) {
                    drawBar(barRef.current);
                    drawLine(lineRef.current);
                }
            })
            .catch((e) => isMounted && setError(e.message));

        return () => {
            isMounted = false;
        };
    }, []);

    if (error) {
        return <p className={styles.error}>{error}</p>;
    }

    return (
        <div className={styles.charts}>
            <figure className={styles.chart}>
                <figcaption>Uses of each word</figcaption>
                <div ref={barRef} />
            </figure>
            <figure className={styles.chart}>
                <figcaption>Uses over a week</figcaption>
                <div ref={lineRef} />
            </figure>
        </div>
    );
}
