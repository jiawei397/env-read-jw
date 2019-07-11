const fs = require('fs');
const path = require('path');

const resolve = function (dir, envName) {
  const map = {};
  try {
    const file = fs.readFileSync(path.resolve(dir, envName), {encoding: 'utf8'});
    const arr = file.toString().split('\r\n').filter(Boolean);
    arr.forEach((item) => {
      let arr2 = item.split('=');
      let key = arr2[0];
      let val = arr2[1];
      val = val.trim();
      val = val.substr(1, val.length - 2);
      map['process.env.' + key.trim()] = JSON.stringify(val);
    });
  } catch (e) {
    console.info(e.message);
  }
  return map;
};


module.exports = (dir, envName = '.env.development') => {
  let commonMap = resolve(dir, '.env');
  let partMap = resolve(dir, envName);
  return Object.assign(partMap, commonMap);
};
