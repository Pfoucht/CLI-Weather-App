const request = require('request');

const geocodeAddress = (address, callback) => {
  let encodedAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  },
    (err, res, body) => {
      if (err) {
        callback(err, null);
      } else if (body.status === "ZERO_RESULTS") {
        callback("Unable to find specified address", null);
      } else if (body.status === "OK") {
        callback(null, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
  })
}

module.exports.geocodeAddress = geocodeAddress;
