import _ from 'underscore';

export function BarDataBuilder(config) {
    this.Klass = BarDataBuilder;

    this.config = _.defaults({}, config);

    this.withLettersFrequency = function () {
        var attributes = _.extend({}, this.config, {
            data: [
                {
                    name: 'A',
                    value: 0.08167,
                },
                {
                    name: 'B',
                    value: 0.01492,
                },
                {
                    name: 'C',
                    value: 0.02782,
                },
                {
                    name: 'D',
                    value: 0.04253,
                },
                {
                    name: 'E',
                    value: 0.12702,
                },
                {
                    name: 'F',
                    value: 0.02288,
                },
                {
                    name: 'G',
                    value: 0.02015,
                },
                {
                    name: 'H',
                    value: 0.06094,
                },
                {
                    name: 'I',
                    value: 0.06966,
                },
                {
                    name: 'J',
                    value: 0.00153,
                },
                {
                    name: 'K',
                    value: 0.00772,
                },
                {
                    name: 'L',
                    value: 0.04025,
                },
                {
                    name: 'M',
                    value: 0.02406,
                },
                {
                    name: 'N',
                    value: 0.06749,
                },
                {
                    name: 'O',
                    value: 0.07507,
                },
                {
                    name: 'P',
                    value: 0.01929,
                },
                {
                    name: 'Q',
                    value: 0.00095,
                },
                {
                    name: 'R',
                    value: 0.05987,
                },
                {
                    name: 'S',
                    value: 0.06327,
                },
                {
                    name: 'T',
                    value: 0.09056,
                },
                {
                    name: 'U',
                    value: 0.02758,
                },
                {
                    name: 'V',
                    value: 0.00978,
                },
                {
                    name: 'W',
                    value: 0.0236,
                },
                {
                    name: 'X',
                    value: 0.0015,
                },
                {
                    name: 'Y',
                    value: 0.01974,
                },
                {
                    name: 'Z',
                    value: 0.00074,
                },
            ],
        });

        return new this.Klass(attributes);
    };

    this.withColors = function () {
        var attributes = _.extend({}, this.config, {
            data: [
                {
                    name: 'Radiating',
                    value: 2,
                },
                {
                    name: 'Opalescent',
                    value: 4,
                },
                {
                    name: 'Shining',
                    value: 3,
                },
                {
                    name: 'Vibrant',
                    value: 6,
                },
                {
                    name: 'Vivid',
                    value: 6,
                },
                {
                    name: 'Brilliant',
                    value: 1,
                },
            ],
        });

        return new this.Klass(attributes);
    };

    this.build = function () {
        return this.config.data;
    };
}
