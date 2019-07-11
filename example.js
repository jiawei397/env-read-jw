const read = require('./index');
const path = require('path');

let map = read(__dirname);
console.log(map);

let map2 = read(__dirname, '.env.production');
console.log(map2);