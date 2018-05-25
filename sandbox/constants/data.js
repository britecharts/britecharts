module.exports = (function() {
    return {
        bar: {
            basicBar: [
                {name: 'Ryan', value:3},
                {name: 'Marcos', value: 5},
                {name: 'Sun', value: 4}
            ],
            decimalBar: [
                {name: 'Safari', value: 0.1559},
                {name: 'Android', value: 0.0459},
                {name: 'Opera', value: 0.0453},
                {name: 'Other', value: 0.046},
                {name: 'Chrome', value: 0.2903},
                {name: 'IE', value: 0.2254},
                {name: 'Firefox', value: 0.1926}
            ]
        },
        brush: {
            basicBrush: [
                { value: 1, date: '2011-01-06T00:00:00' },
                { value: 5, date: '2011-01-07T00:00:00' },
                { value: 4, date: '2011-01-08T00:00:00' },
                { value: 2, date: '2011-01-09T00:00:00' },
                { value: 5, date: '2011-01-10T00:00:00' },
                { value: 6, date: '2011-01-11T00:00:00' },
                { value: 2, date: '2011-01-12T00:00:00' },
                { value: 8, date: '2011-01-13T00:00:00' },
                { value: 9, date: '2011-01-14T00:00:00' }
            ]
        },
        donut: {
            basicDonut: [
                { name: 'Shiny', id: 1, quantity: 86, percentage: 5 },
                { name: 'Blazing', id: 2, quantity: 300, percentage: 18 },
                { name: 'Dazzling', id: 3, quantity: 276, percentage: 16 },
                { name: 'Radiant', id: 4, quantity: 195, percentage: 11 },
                { name: 'Sparkling', id: 5, quantity: 36, percentage: 2 },
                { name: 'Other', id: 0, quantity: 814, percentage: 48 }
            ]
        },
        line: {
            basicLine: {
                dataByTopic: [{
                    topicName: 'Cat data',
                    topic: 2,
                    dates: [
                        {value: 1, date: '2015-06-27T00:00:00'},
                        {value: 1, date: '2015-06-28T00:00:00'},
                        {value: 4, date: '2015-06-29T00:00:00'},
                        {value: 2, date: '2015-06-30T00:00:00'},
                        {value: 3, date: '2015-07-01T00:00:00'},
                        {value: 3, date: '2015-07-02T00:00:00'}
                    ]
                }]
            },
            basicMultiLine: {
                dataByTopic: [{
                    topicName: 'Cat data',
                    topic: 2,
                    dates: [
                        {value: 1, date: '2015-06-27T00:00:00'},
                        {value: 1, date: '2015-06-28T00:00:00'},
                        {value: 4, date: '2015-06-29T00:00:00'},
                        {value: 2, date: '2015-06-30T00:00:00'},
                        {value: 3, date: '2015-07-01T00:00:00'},
                        {value: 3, date: '2015-07-02T00:00:00'}
                    ]
                },
                {
                    topicName: 'Dog data',
                    topic: 3,
                    dates: [
                        {value: 5, date: '2015-06-27T00:00:00'},
                        {value: 2, date: '2015-06-28T00:00:00'},
                        {value: 1, date: '2015-06-29T00:00:00'},
                        {value: 3, date: '2015-06-30T00:00:00'},
                        {value: 0, date: '2015-07-01T00:00:00'},
                        {value: 5, date: '2015-07-02T00:00:00'}
                    ]
                },
                {
                    topicName: 'Raccoon data',
                    topic: 4,
                    dates: [
                        {value: 2, date: '2015-06-27T00:00:00'},
                        {value: 2, date: '2015-06-28T00:00:00'},
                        {value: 0, date: '2015-06-29T00:00:00'},
                        {value: 5, date: '2015-06-30T00:00:00'},
                        {value: 1, date: '2015-07-01T00:00:00'},
                        {value: 4, date: '2015-07-02T00:00:00'}
                    ]
                },
                {
                    topicName: 'Fish data',
                    topic: 5,
                    dates: [
                        {value: 1, date: '2015-06-27T00:00:00'},
                        {value: 0, date: '2015-06-28T00:00:00'},
                        {value: 1, date: '2015-06-29T00:00:00'},
                        {value: 1, date: '2015-06-30T00:00:00'},
                        {value: 2, date: '2015-07-01T00:00:00'},
                        {value: 3, date: '2015-07-02T00:00:00'}
                    ]
                }]
            }
        },
        sparkline: {
            basicSparkLine: [
                { value: 1, date: '2011-01-06T00:00:00' },
                { value: 5, date: '2011-01-07T00:00:00' },
                { value: 4, date: '2011-01-08T00:00:00' },
                { value: 7, date: '2011-01-09T00:00:00' },
                { value: 5, date: '2011-01-10T00:00:00' },
                { value: 6, date: '2011-01-11T00:00:00' },
                { value: 7, date: '2011-01-12T00:00:00' },
                { value: 8, date: '2011-01-13T00:00:00' },
                { value: 1, date: '2011-01-14T00:00:00' }
            ]
        },
        step: {
            basicStep: [
                {key: 'Ryan', value:10},
                {key: 'Marcos', value: 7},
                {key: 'Sun', value: 4}
            ]
        },
        'stacked-area': {
            basicStackedArea: [
                { date: '2017-02-16T00:00:00', name: 'Organizer Driven', value: 5 },
                { date: '2017-02-16T00:00:00', name: 'EB Driven', value: 0 },
                { date: '2017-02-17T00:00:00', name: 'Organizer Driven', value: 13 },
                { date: '2017-02-17T00:00:00', name: 'EB Driven', value: 1 },
                { date: '2017-02-18T00:00:00', name: 'Organizer Driven', value: 15 },
                { date: '2017-02-18T00:00:00', name: 'EB Driven', value: 1 },
                { date: '2017-02-19T00:00:00', name: 'Organizer Driven', value: 15 },
                { date: '2017-02-19T00:00:00', name: 'EB Driven', value: 1 },
                { date: '2017-02-20T00:00:00', name: 'Organizer Driven', value: 18 },
                { date: '2017-02-20T00:00:00', name: 'EB Driven', value: 1 }
            ]
        },
        'scatter-plot': {
            basicScatterPlot: [
                { name: 'Ice Cream Sales', x: 14.2, y: 215 },
                { name: 'Ice Cream Sales', x: 16.4, y: 325 },
                { name: 'Ice Cream Sales', x: 11.9, y: 185 },
                { name: 'Ice Cream Sales', x: 15.2, y: 332 },
                { name: 'Ice Cream Sales', x: 18.5, y: 406 },
                { name: 'Ice Cream Sales', x: 22.1, y: 522 },
                { name: 'Ice Cream Sales', x: 19.4, y: 412 },
                { name: 'Ice Cream Sales', x: 25.1, y: 614 },
                { name: 'Ice Cream Sales', x: 23.4, y: 544 },
                { name: 'Ice Cream Sales', x: 18.1, y: 421 },
                { name: 'Ice Cream Sales', x: 22.6, y: 445 },
                { name: 'Ice Cream Sales', x: 17.2, y: 408 }
            ]
        }
    };
}());
