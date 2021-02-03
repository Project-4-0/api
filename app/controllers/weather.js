require("dotenv").config();

const Sensor = require("../models").Sensor;
const Box = require("../models").Box;
const User = require("../models").User;
const SensorType = require("../models").SensorType;

const axios = require("axios");

//Models
module.exports = {
  async getWeather(req, res) {
    try {
      // get box with lat long

      // call weather api
      let api_key = process.env.OPENWEATHER_APIKEY;
      let lat = "51.14612394592471";
      let long = "5.002733117193132";

      let url =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        long +
        "&appid=" +
        api_key +
        "&units=metric";

      console.log(api_key);
      console.log(url);

      var responseServer = await axios.get(url);

      return res.status(200).send({ result: responseServer.data });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
