require("dotenv").config();

const Sensor = require("../models").Sensor;
const Box = require("../models").Box;
const User = require("../models").User;
const SensorType = require("../models").SensorType;
const BoxUser = require("../models").BoxUser;
const Location = require("../models").Location;

const { Op } = require("sequelize");
const axios = require("axios");

//Models
module.exports = {
  async getWeather(req, res) {
    try {
      //box
      var box = await Box.findByPk(req.params.id);
      if (!box) {
        return res.status(404).send({
          message: "box Not Found",
        });
      }

      var boxUser = await BoxUser.findOne({
        where: {
          EndDate: null,
          StartDate: {
            [Op.not]: null, // Like: sellDate IS NOT NULL
          },
          BoxID: box.BoxID,
        },
        order: [["StartDate", "DESC"]],
      });

      let location = await Location.findOne({
        where: { BoxUserID: boxUser.BoxUserID },
        order: [["StartDate", "DESC"]],
      });

      if (!location) {
        return res.status(404).send({
          message: "Location Not Found",
        });
      }

      // call weather api
      let api_key = process.env.OPENWEATHER_APIKEY;
      let lat = location.Latitude;
      let long = location.Longitude;

      let url =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        long +
        "&appid=" +
        api_key +
        "&units=metric";

      var responseServer = await axios.get(url);

      return res.status(200).send({ result: responseServer.data });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
