import React, { useEffect, useRef, useState } from 'react';

import { version } from '../../../../core/package.json';
import styles from './styles.module.css';

// The published CDN bundle, loaded as a visitor's page would load it. The
// version is pinned because jsDelivr caches an unversioned URL for up to a
// week, which can serve a release that predates the features this page shows.
const CDN = 'https://cdn.jsdelivr.net/npm';
const CORE = `${CDN}/@britecharts/core@${version}/dist`;
const STYLES = `${CORE}/styles/bundle/britecharts.min.css`;
const SCRIPT = `${CORE}/cdn/bundle/core.cdn.min.js`;

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
 * Loads Britecharts once per page: its stylesheet and the core bundle, which
 * includes d3.
 */
function loadBritecharts() {
    if (!loading) {
        const link = document.createElement('link');

        link.rel = 'stylesheet';
        link.href = STYLES;
        document.head.appendChild(link);
        loading = loadScript(SCRIPT);
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
    const { core } = window;

    core.bar()
        .width(container.getBoundingClientRect().width)
        .height(260)
        .a11yTitle('Uses of each word')
        .a11yDescription('Blazing is used most, Shiny least')
        .tooltip(core.tooltip().title('Uses').numberFormat('d'))
        .render(container, barData);
}

function drawLine(container) {
    const { core } = window;

    core.line()
        .width(container.getBoundingClientRect().width)
        .height(260)
        .grid('horizontal')
        .a11yTitle('Uses over a week')
        .tooltip(core.tooltip().title('Uses'))
        .render(container, lineData);
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
