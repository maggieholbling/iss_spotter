const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./src/iss.js');

// fetchMyIP((err, ipString) => {
//   if (err) return console.log(`Error IP-fetch details: ${err}`);
//   if (ipString) return console.log(ipString);
// });

// fetchCoordsByIP("162.245.144.188", (err, geoCoordinates) => {
//   if (err) return console.log(`Something went wrong: ${err}`);
//   if (geoCoordinates) return console.log(geoCoordinates);
// });

fetchISSFlyOverTimes({ latitude: '49.26200', longitude: '-123.09230' }, (err, data) => {
  if (err) return console.log(`Something went wrong: ${err}`);
  if (data) return console.log(data);
});