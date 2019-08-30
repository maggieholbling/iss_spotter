const { nextISSTimesForMyLocation } = require('./src/iss.js');

nextISSTimesForMyLocation((err, data) => {
  if (err) return console.log(`Something went wrong: ${err}`);
  if (data) return printPasses(data);
});

//LHL code for deciphering the date and time
const printPasses = function(issPasses) {
  for (const pass of issPasses) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};