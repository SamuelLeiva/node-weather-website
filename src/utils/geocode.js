const request = require("request");

//single reusable function
const geocode = (address, cb) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibHBpbGFzMjQiLCJhIjoiY2tzaTdyZ2FtMGQzMjJubzk1NDIwY2RiOCJ9._yMxyW9zTHul5xS_8tBHSg`;

  request({ url: url, json: true }, (err, { body }) => {
    if (err) {
      cb("Unable to connect to location services.", undefined); // sino ponemos undefined es lo mismo. Lo provee el mismo JS
    } else if (body.features.length === 0) {
      cb("Unable to find location. Try another search.", undefined);
    } else {
      cb(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
