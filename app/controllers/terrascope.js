const Box = require("../models").Box;
const BoxUser = require("../models").BoxUser;
const Location = require("../models").Location;

var proj4 = require("proj4");
const { create, all, prod } = require("mathjs");
const math = create(all);

//request
const axios = require("axios");
var dateFormat = require("dateformat");

//transform
// const transformation = require("transform-coordinates");
// const transform = transformation("EPSG:4326", "3068"); // WGS 84 to Soldner Berlin

//Validation SensorType
// sensorTypevalidate = (req, res) => {
//   let validationMessages = [];

//   if (!req.body.Name) {
//     validationMessages.push("Name is required.");
//   }

//   if (!req.body.Unit) {
//     validationMessages.push("Unit is required.");
//   }

//   return validationMessages;
// };

// //Check if exist
// async function sensorTypeExist(val) {
//   return await SensorType.findOne({
//     where: { Name: val },
//   });
// }

//Models
module.exports = {
  async getUrlByBoxID(req, res) {
    try {
      var location = await Location.findOne({
        where: { EndDate: null },
        include: [
          { all: true, where: { BoxID: req.params.id, EndDate: null } },
        ],
      });

      if (!location) {
        return res.status(404).send({
          message: "BoxUser Not Found",
        });
      }

      //get square
      var lat1 = location.Latitude;
      var lon1 = location.Longitude;
      //scale
      var terein = 1000;

      //calculatiewaardes
      var smRadius = 6378136.98;
      var smRange = smRadius * math.pi * 2.0;
      var smLonToX = smRange / 360.0;
      var smRadiansOverDegrees = math.pi / 180.0;

      //bereken rechtsboven
      var dLat = terein / smRadius;
      var dLon = (terein / smRadius) * math.cos((math.pi * lat1) / 180);

      var lat2 = lat1 + (dLat * 90) / math.pi;
      var lon2 = lon1 + (dLon * 180) / math.pi;

      var lat3 = lat1 - (dLat * 90) / math.pi;
      var lon3 = lon1 - (dLon * 180) / math.pi;

      //get images
      var firstProjection = "+proj=longlat +datum=WGS84 +no_defs";
      var secondProjection =
        "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs";
      //I'm not going to redefine those two in latter examples.
      var coo1 = proj4(firstProjection, secondProjection, [lon2, lat2]);
      var coo2 = proj4(firstProjection, secondProjection, [lon3, lat3]);

      // 51.14781235867085, 5.01462099231408

      //scale image
      var scale = 0.5;
      var width = (
        (math.max(coo1[0], coo2[0]) - math.min(coo1[0], coo2[0])) *
        scale
      ).toFixed(0);
      var height = (
        (math.max(coo1[1], coo2[1]) - math.min(coo1[1], coo2[1])) *
        scale
      ).toFixed(0);

      //get Call Data ok;
      var product = "S2_FAPAR";
      var d = new Date();
      //20 DAGEN CHECK
      var startDate = dateFormat(d.setDate(d.getDate() - 20), "yyyy-mm-dd");
      var endDate = dateFormat(new Date(), "yyyy-mm-dd");
      var crs = "epsg:4326";
      var source = "probav-mep";

      var postUrl =
        "https://cropsar.vito.be/api/v1.0/cropsar-analysis/?product=" +
        product +
        "&start=" +
        startDate +
        "&end=" +
        endDate +
        "&crs=" +
        crs +
        "&source=" +
        source;

      //make a post requist
      var responseServer = await axios.post(postUrl, {
        type: "Polygon",
        coordinates: [
          [
            [lon3, lat2],
            [lon3, lat3],
            [lon2, lat3],
            [lon2, lat2],
          ],
        ],
      });

      //get data
      var data = responseServer.data.clean["s2-data"];

      //convert to list
      let dataPr = [];
      for (ss in data) {
        if (data[ss].data != "NaN") {
          dataPr.push({ datum: ss, data: data[ss].data });
        }
      }

      //Selected date
      var selectFrame = null;

      dataPr.forEach((element) => {
        console.log(element);
        if (element.data > 0.6) {
          selectFrame = element;
        }
      });

      //check if found
      if (selectFrame == null) {
        return res.status(400).send({ error: "Geen satellietbeeld gevonden!" });
      }

      // get image
      var imgurl1 =
        "https://services.terrascope.be/wms/v2?service=WMS&version=1.3.0&request=GetMap&layers=CGS_S2_FAPAR&format=image/png&time=" +
        selectFrame.datum +
        "&width=" +
        width.toString() +
        "&height=" +
        height.toString() +
        "&bbox=";
      var imgurl2 = "&styles=&srs=EPSG:3857";

      var url =
        imgurl1 +
        math.min(coo2[0], coo1[0]).toString() +
        "," +
        math.min(coo2[1], coo1[1]).toString() +
        "," +
        math.max(coo2[0], coo1[0]).toString() +
        "," +
        math.max(coo2[1], coo1[1]).toString() +
        imgurl2;

      return res.status(200).send({
        url,
      });

      //boxUser
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

// 51.157096880208634, 5.033412036915008
