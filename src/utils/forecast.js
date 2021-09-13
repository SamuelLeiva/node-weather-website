const request = require("request");

const forecast = (lat, long, cb) => {
  const url = `http://api.weatherstack.com/current?access_key=d79c4ebe8f09c00e50fc9e3ac15016d0&query=${lat},${long}&units=f`;

  //anteriormente pusimos res en vez de destructurar { body }
  request({ url, json: true }, (err, { body } = {}) => {
    if (err) {
      cb("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      cb("Unable to find location.", undefined);
    } else {
      cb(
        undefined,
        `${body.location.region}, ${body.location.country}.${body.current.weather_descriptions[0]}. It's currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.\n`
      );
    }
  });
};

module.exports = forecast;
