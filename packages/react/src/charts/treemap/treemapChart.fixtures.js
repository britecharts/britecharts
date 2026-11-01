// From core's treemapBudget.json and treemapUpdatedBudget.json
const withBudget = () => [
    { name: 'Rent', value: 1450 },
    { name: 'Utilities', value: 210 },
    { name: 'Insurance', value: 130 },
    { name: 'Groceries', value: 520 },
    { name: 'Restaurants', value: 240 },
    { name: 'Coffee', value: 60 },
    { name: 'Car', value: 340 },
    { name: 'Fuel', value: 150 },
    { name: 'Train', value: 90 },
    { name: 'Holidays', value: 300 },
    { name: 'Gym', value: 55 },
    { name: 'Books', value: 35 },
];

// The budget after a change: new values, and one entry fewer
const withUpdatedBudget = () => [
    { name: 'Rent', value: 1160 },
    { name: 'Utilities', value: 168 },
    { name: 'Insurance', value: 104 },
    { name: 'Groceries', value: 780 },
    { name: 'Restaurants', value: 360 },
    { name: 'Coffee', value: 90 },
    { name: 'Car', value: 272 },
    { name: 'Fuel', value: 120 },
    { name: 'Holidays', value: 240 },
    { name: 'Gym', value: 44 },
    { name: 'Books', value: 28 },
];

export default { withBudget, withUpdatedBudget };
