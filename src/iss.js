/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = function(callback) {

  request(`https://api.ipify.org?format=json`, (error, response, body) => {

    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const data = JSON.parse(body);

    callback(null, data["ip"]);
  });
};



const fetchCoordsByIP = function(ipString, callback) {
  request(`http://ip-api.com/json/${ipString}`, (error, response, body) => {

    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = {
      "latitude": JSON.parse(body)["lat"],
      "longitude": JSON.parse(body)["lon"]
    };

    callback(null, data);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords["latitude"]}&lon=${coords["longitude"]}`, (error, response, body) => {

    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body)["response"];

    callback(null, data);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((err, ipString) => {
    if (err) return callback(err, null);

    fetchCoordsByIP(ipString, (err, geoCoordinates) => {
      if (err) return callback(err, null);
      
      fetchISSFlyOverTimes(geoCoordinates, (err, data) => {
        if (err) return callback(err, null);
        callback(null, data);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };