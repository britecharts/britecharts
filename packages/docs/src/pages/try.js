/* eslint-disable react/prop-types */
import React from 'react';
import Layout from '@theme/Layout';

import examples from '@site/src/data/examples.json';
import styles from './try.module.css';

const SOURCE = 'https://github.com/britecharts/britecharts/tree/main/examples';

/**
 * Opens an example on StackBlitz by posting its files, as StackBlitz's POST
 * API describes. The `node` template runs it in the browser: StackBlitz
 * installs the packages from npm and starts the dev server.
 */
function OpenInStackBlitz({ example }) {
    return (
        <form
            method="post"
            action={`https://stackblitz.com/run?file=${example.openFile}`}
            target="_blank"
        >
            <input
                type="hidden"
                name="project[title]"
                value={`Britecharts: ${example.title}`}
            />
            <input
                type="hidden"
                name="project[description]"
                value={example.description}
            />
            <input type="hidden" name="project[template]" value="node" />
            {Object.entries(example.files).map(([file, content]) => (
                <input
                    key={file}
                    type="hidden"
                    name={`project[files][${file}]`}
                    value={content}
                />
            ))}
            <button className="button button--primary" type="submit">
                Open in StackBlitz
            </button>
        </form>
    );
}

export default function Try() {
    return (
        <Layout
            title="Try Britecharts"
            description="Open a running Britecharts example in your browser, in plain JavaScript or React, with nothing to install."
        >
            <main className="container margin-vert--xl">
                <h1>Try Britecharts</h1>
                <p className={styles.lede}>
                    Open a running example on StackBlitz, with nothing to
                    install. Each draws a bar chart and a line chart with their
                    tooltips, switches to dark mode, and moves through the data
                    with the keyboard. StackBlitz installs the packages from npm
                    and starts the app in a new tab, which takes about half a
                    minute.
                </p>
                <div className={styles.examples}>
                    {examples.map((example) => (
                        <section key={example.id} className="card">
                            <div className="card__header">
                                <h2>{example.title}</h2>
                            </div>
                            <div className="card__body">
                                <p>{example.description}</p>
                            </div>
                            <div className="card__footer">
                                <OpenInStackBlitz example={example} />
                            </div>
                        </section>
                    ))}
                </div>
                <p className={styles.source}>
                    The examples live in the repository&apos;s{' '}
                    <a href={SOURCE}>examples folder</a>. To run one on your
                    machine, copy its folder, then run <code>npm install</code>{' '}
                    and <code>npm run dev</code>.
                </p>
            </main>
        </Layout>
    );
}
