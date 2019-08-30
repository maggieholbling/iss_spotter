const { fetchMyIP } = require('./src/iss.js');

fetchMyIP((err, ipString) => {
  if (err) return console.log(`Error IP-fetch details: ${err}`);
  if (ipString) return console.log(ipString);
});