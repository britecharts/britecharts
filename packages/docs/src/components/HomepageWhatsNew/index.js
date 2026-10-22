import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const WhatsNew = [
    {
        title: 'Accessibility built in',
        to: '/docs/how-tos/user-how-to-guides#how-to-make-a-chart-accessible',
        description:
            'Charts named for screen readers, data tables, keyboard navigation, reduced motion and the Okabe–Ito palette, on by default.',
    },
    {
        title: 'Theming and dark mode',
        to: '/docs/how-tos/user-how-to-guides#how-to-theme-a-chart-and-support-dark-mode',
        description:
            'Every colour around the data is a CSS custom property, and the charts follow the page’s color-scheme.',
    },
    {
        title: 'SVG and PNG export',
        to: '/docs/how-tos/user-how-to-guides#how-to-export-a-chart',
        description:
            'One call, exportChart(), downloads the chart as an SVG or a PNG, with its styles and an optional title.',
    },
    {
        title: 'Chart specs and JSON Schemas',
        to: '/docs/how-tos/user-how-to-guides#how-to-describe-a-chart-as-a-spec-and-check-it',
        description:
            'Describe a chart as JSON and validate it before drawing; the wrappers say what each wrong value should be.',
    },
    {
        title: 'Made for coding agents',
        to: '/docs/packages/core-readme',
        description:
            'llms.txt, an agent skill inside the package, and errors that suggest the fix and link the API page.',
    },
    {
        title: 'TypeScript, D3 v7 and three packages',
        to: '/docs/how-tos/migration-guide-2-to-3',
        description:
            'Typed charts in @britecharts/core, @britecharts/wrappers and @britecharts/react, responsive by default and tree-shakable.',
    },
];

export default function HomepageWhatsNew() {
    return (
        <section className={styles.whatsNew}>
            <div className="container">
                <Heading as="h2" id="whats-new" className="text--center">
                    What&apos;s New in Version 3
                </Heading>
                <div className="row">
                    {WhatsNew.map(({ title, to, description }) => (
                        <div key={title} className="col col--4">
                            <div className={styles.item}>
                                <h3>
                                    <Link to={to}>{title}</Link>
                                </h3>
                                <p>{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text--center">
                    Coming from version 2? Read the{' '}
                    <Link to="/docs/how-tos/migration-guide-2-to-3">
                        migration guide
                    </Link>
                    .
                </p>
            </div>
        </section>
    );
}
