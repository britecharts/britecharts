import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageGetStarted from '@site/src/components/HomepageGetStarted';
import HomepageWhatsNew from '@site/src/components/HomepageWhatsNew';

const descriptions =
    'Britecharts is a library of finished D3.js charts, accessible by default, with dark mode, SVG and PNG export, TypeScript types and a JSON Schema for every chart. Use it from a script tag, any framework or React.';

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();

    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <h1 className={styles.heroTitle}>
                    <img
                        className={styles.heroLogo}
                        src={useBaseUrl('/img/brand/britecharts-logo.svg')}
                        alt={siteConfig.title}
                        width="1000"
                        height="200"
                    />
                </h1>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/tutorials/getting-started"
                    >
                        Get Started
                    </Link>
                    <Link
                        className="button button--outline button--secondary button--lg"
                        to="#whats-new"
                    >
                        What&apos;s New in v3
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
                <HomepageWhatsNew />
                <HomepageGetStarted />
            </main>
        </Layout>
    );
}
