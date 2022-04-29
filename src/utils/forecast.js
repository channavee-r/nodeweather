const request = require("request");

const forecast = (lat, long, callback) => {
  url = `http://api.weatherstack.com/current?access_key=3a4c2c5a40cf70ae2c0f0fb9db50cc56&query=${lat},${long}`;
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      console.log("unable to connect to weather services");
    } else if (body.error) {
      console.log("location not found");
    } else {
      callback(undefined, `current temprature is ${body.current.temperature}%`);
    }
  });
};

module.exports = forecast;
