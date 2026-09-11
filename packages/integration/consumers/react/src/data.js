// Ported from britecharts-react-test-project; tests/browser.spec.js counts
// the donut slices and the line topics.
export const donutData = [
    { quantity: 60, percentage: 60, name: 'React', id: 1 },
    { quantity: 20, percentage: 20, name: 'Ember', id: 2 },
    { quantity: 10, percentage: 10, name: 'Angular', id: 3 },
    { quantity: 10, percentage: 10, name: 'Backbone', id: 4 },
];

export const lineData = {
    data: [
        { topicName: 'San Francisco', name: 1, date: '2017-01-16T16:00:00-08:00', value: 1 },
        { topicName: 'San Francisco', name: 1, date: '2017-01-17T16:00:00-08:00', value: 2 },
        { topicName: 'Oakland', name: 2, date: '2017-01-16T16:00:00-08:00', value: 3 },
        { topicName: 'Oakland', name: 2, date: '2017-01-17T16:00:00-08:00', value: 7 },
    ],
};
