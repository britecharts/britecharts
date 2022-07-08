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
                                    <a href="">
                                        Getting Started Using Britecharts
                                    </a>
                                </li>
                                <li>
                                    <a href="">Installing Britecharts</a>
                                </li>
                                <li>
                                    <a href="">
                                        Composing Your First Data Visualization
                                    </a>
                                </li>
                                <li>
                                    <a href="">Styling Britecharts</a>
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
                                    <a href="">User How-To Guides</a>
                                </li>
                                <li>
                                    <a href="">Contributor How-To Guides</a>
                                </li>
                                <li>
                                    <a href="">Migration from v2 to v3</a>
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
                                    <a href="">Code Standards</a>
                                </li>
                                <li>
                                    <a href="">API Guildelines</a>
                                </li>
                                <li>
                                    <a href="">Code and Project Structure</a>
                                </li>
                                <li>
                                    <a href="">Issue and Feature Labels</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
