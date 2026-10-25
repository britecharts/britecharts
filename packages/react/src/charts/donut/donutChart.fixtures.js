const with4Slices = () => [
    {
        quantity: 60,
        percentage: 60,
        name: 'React',
        id: 1,
    },
    {
        quantity: 20,
        percentage: 20,
        name: 'Ember',
        id: 2,
    },
    {
        quantity: 10,
        percentage: 10,
        name: 'Angular',
        id: 3,
    },
    {
        quantity: 10,
        percentage: 10,
        name: 'Backbone',
        id: 4,
    },
];

const with6Slices = () => [
    { name: 'Shiny', id: 1, quantity: 86, percentage: 5 },
    { name: 'Blazing', id: 2, quantity: 300, percentage: 18 },
    { name: 'Dazzling', id: 3, quantity: 276, percentage: 16 },
    { name: 'Radiant', id: 4, quantity: 195, percentage: 11 },
    { name: 'Sparkling', id: 5, quantity: 36, percentage: 2 },
    { name: 'Other', id: 0, quantity: 814, percentage: 48 },
];

const with3Slices = () => [
    { name: 'Shiny', id: 11, quantity: 200, percentage: 20 },
    { name: 'Radiant', id: 12, quantity: 200, percentage: 20 },
    { name: 'Sparkling', id: 13, quantity: 600, percentage: 60 },
];

export default {
    with3Slices,
    with4Slices,
    with6Slices,
};
