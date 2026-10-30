import { useState } from 'react';
import { Bar, Line, ResponsiveContainer, Tooltip } from '@britecharts/react';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

const words = ['Shiny', 'Blazing', 'Glittering', 'Radiant', 'Sunny'];

const barData = words.map((name, i) => ({
    name,
    value: [12, 31, 18, 24, 15][i],
}));

// The line chart takes one row per point: `name` identifies the line and
// `topicName` labels it
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

export default function App() {
    const [isDark, setIsDark] = useState(false);

    // The charts take their colours from the page's color-scheme
    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark', !isDark);
        setIsDark(!isDark);
    };

    return (
        <main>
            <header>
                <h1>Britecharts in React</h1>
                <button type="button" onClick={toggleTheme}>
                    {isDark ? 'Light mode' : 'Dark mode'}
                </button>
            </header>
            <p>
                Hover a chart for its tooltip, or press Tab to reach it and use
                the arrow keys. Screen readers also get each chart&apos;s data
                as a table.
            </p>
            <section>
                <h2>Uses of each word</h2>
                <ResponsiveContainer
                    render={({ width }) => (
                        <Tooltip
                            data={barData}
                            title="Uses"
                            render={(props) => (
                                <Bar
                                    {...props}
                                    width={width}
                                    height={300}
                                    a11yTitle="Uses of each word"
                                />
                            )}
                        />
                    )}
                />
            </section>
            <section>
                <h2>Uses over a week</h2>
                <ResponsiveContainer
                    render={({ width }) => (
                        <Tooltip
                            data={lineData}
                            title="Uses"
                            // The line chart sends the hovered date's values under `topics`
                            topicLabel="topics"
                            render={(props) => (
                                <Line
                                    {...props}
                                    width={width}
                                    height={300}
                                    grid="horizontal"
                                    a11yTitle="Uses over a week"
                                />
                            )}
                        />
                    )}
                />
            </section>
        </main>
    );
}
