const path = require("path");
const express = require("express");
const hbs = require("hbs");

//utils
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs"); //we are using hbs files
app.set("views", viewsPath); //custom directory of templates
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    //valores que estamos pasando para usarlo en el hbs
    title: "Weather App",
    name: "Samuel Leiva",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Samuel Leiva",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Me",
    message: "Mensaje de ayuda!!",
    name: "Samuel Leiva",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      errMsg: "You must provide an address",
    });
  }

  //llamamos a geocode
  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({ err: err }); //return para salir del flujo de la funcion
    }

    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({ err: err });
      }

      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address,
      });
      // console.log(data.location);
      // console.log(forecastData);
    });
  });

  // res.send({
  //   forecast: "It is cloudy",
  //   location: "Peru",
  //   address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Samuel Leiva",
    errorMessage: "Help article not found",
  });
});

//error page
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Samuel Leiva",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
