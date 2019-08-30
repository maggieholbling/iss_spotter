const request = require('request-promise-native');

const fetchMyIP = function() {
  return request(`https://api.ipify.org?format=json`);
};

const fetchCoordsByIP = function(ipJSONString) {
  const ipString = JSON.parse(ipJSONString)["ip"];
  return request(`http://ip-api.com/json/${ipString}`);
}

const fetchISSFlyOverTimes = function(coordsJSONString) {
  const { lat, lon } = JSON.parse(coordsJSONString);
  const coords = { lat, lon };
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords["lat"]}&lon=${coords["lon"]}`);
};

const nextISSTimesForMyLocation = function() {
  fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((passesJSONString) => {
    const passes = JSON.parse(passesJSONString)["response"];
    return (printPasses(passes));
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
}

//LHL code for deciphering the date and time
const printPasses = function(issPasses) {
  for (const pass of issPasses) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};
module.exports = { nextISSTimesForMyLocation };