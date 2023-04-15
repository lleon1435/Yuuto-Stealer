const axios = require('axios');

module.exports = axios.get('http://ip-api.com/json/')
  .then(res => {
    if (res.status !== 200) return;
    return res.data;
  })
  .catch(() => {});
