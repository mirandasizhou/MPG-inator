const axios = require('axios');
const token = require('/../config.js');

let gasPriceSearch = (state, cb) => {
  let options = {
    headers: {
      'User-Agent': 'request',
      'Authorization': `apikey ${token.TOKEN}`,
    }
  };
  axios.get('https://api.collectapi.com/gasPrice/stateUsaPrice?state=' + state, options)
   .then((results) => {
     cb(null, results);
   })
   .catch(error => {
     console.log(error);
     cb(error);
   });
}

module.exports = gasPriceSearch;