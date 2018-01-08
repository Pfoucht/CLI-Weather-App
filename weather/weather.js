const request = require('request');

const getWeather = (lat, lng, callback) => {

  request({
    url: `https://api.darksky.net/forecast/391a647e44a8ad8ae68c2d72e196b9b5/${lat},${lng}`,
    json: true
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback("Unable to reach server");
    }

  });
}

module.exports.getWeather = getWeather;
