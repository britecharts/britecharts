/* eslint-disable react/prop-types */
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
    {
        title: 'Finished Charts, Not a Grammar',
        Svg: require('@site/static/img/undraw_takeout_boxes.svg').default,
        description: (
            <>
                Pick a chart, give it data, and get a polished one with
                tooltips, animation, loading states and export built in. Every
                chart shares one vocabulary, so there are fewer ways to go
                wrong.
            </>
        ),
    },
    {
        title: 'Accessible by Default, and Free',
        Svg: require('@site/static/img/undraw_designer_girl.svg').default,
        description: (
            <>
                Named for screen readers, with the data as a table they can
                read, keyboard navigation with the tooltip following focus,
                reduced motion and a colour-blind-safe palette. All on by
                default.
            </>
        ),
    },
    {
        title: 'One Script Tag or One Config',
        Svg: require('@site/static/img/brand/d3/d3-outline.svg').default,
        description: (
            <>
                Plain <a href="https://d3js.org/">D3.js</a> that runs in any
                page from a CDN, any framework through the wrappers, or React. A
                chart is also a JSON spec, which a schema checks for you, or for
                your coding agent.
            </>
        ),
    },
];

function Feature({ Svg, title, description }) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img" />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
