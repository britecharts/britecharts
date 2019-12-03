module.exports = (function() {
    return {
        bar: {
            basicBar: [
                {name: 'Shiny', value:3},
                {name: 'Radiant', value: 5},
                {name: 'Sparkling', value: 4}
            ],
            decimalBar: [
                {name: 'Shiny', value: 0.1559},
                {name: 'Blazing', value: 0.0459},
                {name: 'Dazzling', value: 0.0453},
                {name: 'Radiant', value: 0.046},
                {name: 'Sparkling', value: 0.2903},
                {name: 'Luminous', value: 0.2254},
                {name: 'Blasting', value: 0.1926}
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
        'grouped-bar': {
            basicGroupedBar: [
                { group: 'Shiny', name: 'Q1', value: 26 },
                { group: 'Blazing', name: 'Q1', value: 30 },
                { group: 'Dazzling', name: 'Q1', value: 27 },
                { group: 'Shiny', name: 'Q2', value: 36 },
                { group: 'Blazing', name: 'Q2', value: 40 },
                { group: 'Dazzling', name: 'Q2', value: 76 },
                { group: 'Shiny', name: 'Q3', value: 13 },
                { group: 'Blazing', name: 'Q3', value: 16 },
                { group: 'Dazzling', name: 'Q3', value: 26 },
            ]
        },
        legend: {
            basicLegend: [
                { name: 'Shiny', id: 1, quantity: 86},
                { name: 'Blazing', id: 2, quantity: 300},
                { name: 'Dazzling', id: 3, quantity: 276},
                { name: 'Radiant', id: 4, quantity: 195},
                { name: 'Sparkling', id: 5, quantity: 36},
                { name: 'Other', id: 0, quantity: 814}
            ]
        },
        line: {
            basicLine: {
                dataByTopic: [{
                    topicName: 'Shiny',
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
                    topicName: 'Shiny',
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
                    topicName: 'Blazing',
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
                    topicName: 'Sparkling',
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
                    topicName: 'Radiant',
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
                {key: 'Dazzling', value:10},
                {key: 'Radiant', value: 7},
                {key: 'Sunny', value: 4}
            ]
        },
        'stacked-area': {
            basicStackedArea: [
                { date: '2017-02-16T00:00:00', name: 'Radiant', value: 5 },
                { date: '2017-02-16T00:00:00', name: 'Dazzling', value: 3 },
                { date: '2017-02-17T00:00:00', name: 'Radiant', value: 13 },
                { date: '2017-02-17T00:00:00', name: 'Dazzling', value: 1 },
                { date: '2017-02-18T00:00:00', name: 'Radiant', value: 15 },
                { date: '2017-02-18T00:00:00', name: 'Dazzling', value: 2 },
                { date: '2017-02-19T00:00:00', name: 'Radiant', value: 15 },
                { date: '2017-02-19T00:00:00', name: 'Dazzling', value: 5 },
                { date: '2017-02-20T00:00:00', name: 'Radiant', value: 18 },
                { date: '2017-02-20T00:00:00', name: 'Dazzling', value: 3 }
            ],
            fourStacksArea: [
                { date: '2017-02-16T00:00:00', name: 'Radiant', value: 5 },
                { date: '2017-02-16T00:00:00', name: 'Sparkling', value: 5 },
                { date: '2017-02-16T00:00:00', name: 'Dazzling', value: 2 },
                { date: '2017-02-16T00:00:00', name: 'Luminous', value: 2 },
                { date: '2017-02-17T00:00:00', name: 'Radiant', value: 6 },
                { date: '2017-02-17T00:00:00', name: 'Sparkling', value: 6 },
                { date: '2017-02-17T00:00:00', name: 'Dazzling', value: 3 },
                { date: '2017-02-17T00:00:00', name: 'Luminous', value: 4 },
                { date: '2017-02-18T00:00:00', name: 'Radiant', value: 15 },
                { date: '2017-02-18T00:00:00', name: 'Sparkling', value: 15 },
                { date: '2017-02-18T00:00:00', name: 'Dazzling', value: 5 },
                { date: '2017-02-18T00:00:00', name: 'Luminous', value: 5 },
                { date: '2017-02-19T00:00:00', name: 'Radiant', value: 9 },
                { date: '2017-02-19T00:00:00', name: 'Sparkling', value: 9 },
                { date: '2017-02-19T00:00:00', name: 'Dazzling', value: 4 },
                { date: '2017-02-19T00:00:00', name: 'Luminous', value: 4 },
                { date: '2017-02-20T00:00:00', name: 'Radiant', value: 16 },
                { date: '2017-02-20T00:00:00', name: 'Sparkling', value: 16 },
                { date: '2017-02-20T00:00:00', name: 'Dazzling', value: 3 },
                { date: '2017-02-20T00:00:00', name: 'Luminous', value: 3 }
            ]
        },
        'scatter-plot': {
            basicScatterPlot: [
                { name: 'Sparkling', x: 14.2, y: 215 },
                { name: 'Sparkling', x: 16.4, y: 325 },
                { name: 'Sparkling', x: 11.9, y: 185 },
                { name: 'Sparkling', x: 15.2, y: 332 },
                { name: 'Sparkling', x: 18.5, y: 406 },
                { name: 'Sparkling', x: 22.1, y: 522 },
                { name: 'Sparkling', x: 19.4, y: 412 },
                { name: 'Sparkling', x: 25.1, y: 614 },
                { name: 'Sparkling', x: 23.4, y: 544 },
                { name: 'Sparkling', x: 18.1, y: 421 },
                { name: 'Sparkling', x: 22.6, y: 445 },
                { name: 'Sparkling', x: 17.2, y: 408 }
            ]
        }
    };
}());
