/* eslint-disable react/prop-types */
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
    {
        title: 'Reusable and Composable',
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: (
            <>
                Configure your charts to create different looks and behaviors.
                Mix and match components to create insightful experiences.
            </>
        ),
    },
    {
        title: 'Great Design',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (
            <>
                Britechart&apos;s codebase is a regular D3.js code you can fork
                and modify.
            </>
        ),
    },
    {
        title: 'Powered by D3.js',
        Svg: require('@site/static/img/brand/d3/d3-outline.svg').default,
        description: (
            <>
                Britechart&apos;s codebase is simple and conventional D3.js code
                you can fork and modify.
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
