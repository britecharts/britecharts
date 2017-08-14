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
        }
    };
}());
