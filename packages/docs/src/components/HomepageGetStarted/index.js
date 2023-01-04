/* eslint-disable react/prop-types */
import React from 'react';
import styles from './styles.module.css';

export default function HomepageGetStarted() {
    return (
        <section className={styles.getstarted}>
            <div className="container">
                <div className="row">
                    <div className="col col--4">
                        <div className="padding-horiz--md">
                            <h3>Tutorials</h3>
                            <p>
                                Britechart tutorials allow new users to get
                                started and learn the basic components of the
                                library. They are meant to be a learning
                                experience ideal for newcomers:
                            </p>
                            <ul>
                                <li>
                                    <a href="/docs/tutorials/getting-started">
                                        Getting Started Using Britecharts
                                    </a>
                                </li>
                                <li>
                                    <a href="/docs/tutorials/installing-britecharts">
                                        Installing Britecharts
                                    </a>
                                </li>
                                <li>
                                    <a href="/docs/tutorials/composing-dataviz">
                                        Composing Your First Data Visualization
                                    </a>
                                </li>
                                <li>
                                    <a href="/docs/tutorials/styling-charts">
                                        Styling Britecharts
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col col--4">
                        <div className="padding-horiz--md">
                            <h3>How-To Guides</h3>
                            <p>
                                The Britecharts how-to guides provide step by
                                step instructions on how to accomplish standard
                                tasks with the library. We have multiple guides
                                for specific type of users:
                            </p>
                            <ul>
                                <li>
                                    <a href="/docs/how-tos/user-how-to-guides">
                                        User How-To Guides
                                    </a>
                                </li>
                                <li>
                                    <a href="/docs/how-tos/contributor-how-to-guides">
                                        Contributor How-To Guides
                                    </a>
                                </li>
                                <li>
                                    <a href="/docs/how-tos/migration-guide-2-to-3">
                                        Migration from v2 to v3
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col col--4">
                        <div className="padding-horiz--md">
                            <h3>Topics</h3>
                            <p>
                                Where we discuss important concepts for
                                Britecharts, giving context to some of our
                                decisions to help understand how we have created
                                the library.
                            </p>
                            <ul>
                                <li>
                                    <a href="/docs/topics/code-standards">
                                        Code Standards
                                    </a>
                                </li>
                                <li>
                                    <a href="/docs/topics/api-guidelines">
                                        API Guildelines
                                    </a>
                                </li>
                                <li>
                                    <a href="/docs/topics/code-structure">
                                        Code and Project Structure
                                    </a>
                                </li>
                                <li>
                                    <a href="/docs/topics/github-labels">
                                        Issue and Feature Labels
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
