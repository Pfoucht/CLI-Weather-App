const yargs = require('yargs');
const axios = require('axios');

// const geocode = require("./geocode/geocode");
// const getWeather = require("./weather/weather");

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCcmrvTK6DT1p5BwtAgsv995ahdLxpbd5A&address=${encodedAddress}`


axios.get(geocodeURL)
  .then((response) => {
    if (response.data.status == "ZERO_RESULTS") {
      throw new Error("Unable to find that address.")
    }

    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    let weatherURL = `https://api.darksky.net/forecast/391a647e44a8ad8ae68c2d72e196b9b5/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL)
  })
  .then((response) => {
    let temp = response.data.currently.temperature;
    let apparentTemp = response.data.currently.apparentTemperature;
    console.log(`The temperature is currently ${temp}. It feels like ${apparentTemp}.`);
  })
  .catch((error) => {
    if (error.code === "ENOTFOUND") {
      console.log("Unable to connect to API Servers.");
    } else {
      console.log(error.message);
    }
  })
