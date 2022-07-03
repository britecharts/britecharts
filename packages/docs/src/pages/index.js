import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageGetStarted from '@site/src/components/HomepageGetStarted';

const descriptions =
    'Britecharts is a client-side reusable Charting Library based on D3.js v5 that allows easy and intuitive use of charts and components that can be composed together creating amazing visualizations.';

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();

    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <h1 className="hero__title">{siteConfig.title}</h1>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/tutorials/getting-started"
                    >
                        Britecharts Tutorial
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default function Home() {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout title={`${siteConfig.tagline}`} description={descriptions}>
            <HomepageHeader />
            <main>
                <HomepageFeatures />
                <HomepageGetStarted />
            </main>
        </Layout>
    );
}
