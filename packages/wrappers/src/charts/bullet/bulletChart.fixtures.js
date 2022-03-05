const fullTestData = () => [
    {
        ranges: [130, 160, 250],
        measures: [150, 180],
        markers: [175],
    },
];
const partialTestData = () => [
    {
        ranges: [130],
        measures: [150],
        markers: [105],
    },
];
const underRangeNoMarker = () => [
    {
        ranges: [50, 100],
        measures: [25],
        markers: [],
    },
];

export default {
    fullTestData,
    partialTestData,
    underRangeNoMarker,
};
