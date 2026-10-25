const with3Groups = () => [
    {
        name: 'Dogs',
        group: 'Group A',
        value: 4,
    },
    {
        name: 'Dogs',
        group: 'Group B',
        value: 8,
    },
    {
        name: 'Dogs',
        group: 'Group C',
        value: 6,
    },
    {
        name: 'Cats',
        group: 'Group A',
        value: 2,
    },
    {
        name: 'Cats',
        group: 'Group B',
        value: 7,
    },
    {
        name: 'Cats',
        group: 'Group C',
        value: 12,
    },
    {
        name: 'Both',
        group: 'Group A',
        value: 5,
    },
    {
        name: 'Both',
        group: 'Group B',
        value: 6,
    },
    {
        name: 'Both',
        group: 'Group C',
        value: 5,
    },
];

const with2Groups = () => [
    {
        name: 'Ari',
        group: 'Group A',
        value: 12,
    },
    {
        name: 'Beth',
        group: 'Group B',
        value: 15,
    },
];

const with3Sources = () => [
    { group: 'Shiny', value: 3, name: '2011-01-05' },
    { group: 'Shiny', value: 10, name: '2011-01-06' },
    { group: 'Shiny', value: 16, name: '2011-01-07' },
    { group: 'Shiny', value: 23, name: '2011-01-08' },
    { group: 'Radiant', value: 23, name: '2011-01-05' },
    { group: 'Radiant', value: 16, name: '2011-01-06' },
    { group: 'Radiant', value: 10, name: '2011-01-07' },
    { group: 'Radiant', value: 4, name: '2011-01-08' },
    { group: 'Luminous', value: 10, name: '2011-01-05' },
    { group: 'Luminous', value: 20, name: '2011-01-06' },
    { group: 'Luminous', value: 26, name: '2011-01-07' },
    { group: 'Luminous', value: 33, name: '2011-01-08' },
];

const withNegativeValues = () => [
    { group: 'Gains', value: 3, name: '2011-01-05' },
    { group: 'Losses', value: -5, name: '2011-01-05' },
    { group: 'Gains', value: -4, name: '2011-01-06' },
    { group: 'Losses', value: 7, name: '2011-01-06' },
    { group: 'Gains', value: 6, name: '2011-01-07' },
    { group: 'Losses', value: -3, name: '2011-01-07' },
    { group: 'Gains', value: -2, name: '2011-01-08' },
    { group: 'Losses', value: 4, name: '2011-01-08' },
];

export default {
    with3Sources,
    withNegativeValues,
    with3Groups,
    with2Groups,
};
