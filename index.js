const { fetchMyIP, fetchCoordsByIP } = require('./src/iss.js');

// fetchMyIP((err, ipString) => {
//   if (err) return console.log(`Error IP-fetch details: ${err}`);
//   if (ipString) return console.log(ipString);
// });

fetchCoordsByIP("162.245.144.188", (err, geoCoordinates) => {
  if (err) return console.log(`Something went wrong: ${err}`);
  if (geoCoordinates) return console.log(geoCoordinates);
});