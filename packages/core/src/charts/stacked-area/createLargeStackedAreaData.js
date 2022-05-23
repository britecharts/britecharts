// to run `node <path to>createLargeStackedAreaData.js`
const fs = require('fs');
const config = {
    path: './../json/areaDataLarge.json',
    sources: [
        'google',
        'facebook',
        'twitter',
        'user_newsvarter',
        'user_email',
        'unknown',
    ],
    startDate: new Date(),
};
const monthHash = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dev: '12',
};
let writable = {
    data: [],
};
let currentDate;
let toAdd;
let i = 0;

for (; i < 100; i++) {
    currentDate = new Date(new Date().setDate(config.startDate.getDate() + i));

    config.sources.forEach(function (name) {
        toAdd = {};

        toAdd.dateUTC = formatDateUTC(currentDate, true);
        toAdd.name = name;
        toAdd.views = (Math.random() * 100) | 0;

        writable.data.push(toAdd);
    });
}

fs.writeFile(config.path, JSON.stringify(writable), function (err) {
    if (err) {
        // eslint-disable-next-line no-console
        console.log('error', err);
    }
});

function formatPrependZero(n) {
    if (JSON.stringify(n).length === 1) {
        return '0' + n;
    }

    return n;
}

function formatDateUTC(_date, isUTC) {
    const time = 'T00:00:00';
        const d = _date.toUTCString().split(' ');
        const year = d[3];
        const month = d[2];
        const date = d[1];

    if (isUTC) {
        time = 'T08:00:00Z';
    }

    return (
        '' +
        year +
        '-' +
        monthHash[month] +
        '-' +
        formatPrependZero(date) +
        time
    );
}
