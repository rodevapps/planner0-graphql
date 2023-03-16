const fs = require('fs');

const time = new Date("2022-04-01 08:00");
const dtime = 3600000;

const obj = [
 {id: 1, who: 'Free', time: time},
 {id: 2, who: 'Free', time: new Date(time.getTime() + dtime)},
 {id: 3, who: 'Free', time: new Date(time.getTime() + 2 * dtime)},
 {id: 4, who: 'Free', time: new Date(time.getTime() + 3 * dtime)},
 {id: 5, who: 'Free', time: new Date(time.getTime() + 4 * dtime)},
 {id: 6, who: 'Free', time: new Date(time.getTime() + 5 * dtime)},
 {id: 7, who: 'Free', time: new Date(time.getTime() + 6 * dtime)},
 {id: 8, who: 'Free', time: new Date(time.getTime() + 7 * dtime)},
];

fs.writeFileSync('./data.json', JSON.stringify(obj), 'utf-8');
