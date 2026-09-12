// Small datasets in each chart's input shape, for the hover page. Values are
// chosen so the first and last data points sit near the chart's edges, which
// is where a tooltip has to flip or slide to stay inside.

const day = (n) => `2016-08-${String(n).padStart(2, '0')}T00:00:00Z`;

export const lineData = {
    data: [
        ...[0, 3, 8, 5, 9, 4, 7, 2, 6, 10].map((value, i) => ({
            name: 'Vivid',
            topicName: 'Vivid',
            value,
            date: day(i + 1),
        })),
        ...[4, 6, 2, 7, 3, 8, 5, 9, 1, 6].map((value, i) => ({
            name: 'Flashy',
            topicName: 'Flashy',
            value,
            date: day(i + 1),
        })),
    ],
};

export const stackedAreaData = ['Blazing', 'Flashy', 'Vivid'].flatMap(
    (name, series) =>
        [3, 7, 4, 9, 6, 8, 5, 10].map((value, i) => ({
            name,
            value: value + series * 2,
            date: day(i + 1),
        }))
);

const names = [
    '2011-01-05',
    '2011-01-06',
    '2011-01-07',
    '2011-01-08',
    '2011-01-09',
    '2011-01-10',
];

export const stackedBarData = ['vivid', 'flashy'].flatMap((stack, series) =>
    names.map((name, i) => ({ stack, name, value: 5 + i * 3 + series * 4 }))
);

export const groupedBarData = ['Shiny', 'Blazing'].flatMap((group, series) =>
    names.map((name, i) => ({ group, name, value: 3 + i * 4 + series * 2 }))
);

export const barData = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(
    (name, i) => ({ name, value: 2 + ((i * 7) % 11) })
);

export const scatterData = [
    [11.9, 185],
    [14.2, 215],
    [15.2, 332],
    [16.4, 325],
    [17.2, 408],
    [18.1, 421],
    [18.5, 406],
    [19.4, 412],
    [22.1, 522],
    [22.6, 445],
    [23.4, 544],
    [25.1, 614],
].map(([x, y]) => ({ name: 'Ice Cream Sales', x, y }));

export const heatmapData = Array.from({ length: 7 }, (_, dayIndex) =>
    Array.from({ length: 24 }, (_, hour) => ({
        day: dayIndex,
        hour,
        value: (dayIndex * 5 + hour * 3) % 17,
    }))
).flat();
