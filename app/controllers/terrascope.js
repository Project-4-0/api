const Box = require("../models").Box;
const BoxUser = require("../models").BoxUser;
const Location = require("../models").Location;

var proj4 = require("proj4");
// import { sqrt } from "mathjs";
const { create, all } = require("mathjs");
const math = create(all);
// proj = new Proj4js.Proj("EPSG:4139");

//EPSG:4326 to EPSG:3857

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
      //   var location = await Location.findOne({
      //     where: { EndDate: null },
      //     include: [
      //       { all: true, where: { BoxID: req.params.id, EndDate: null } },
      //     ],
      //   });

      //   if (!location) {
      //     return res.status(404).send({
      //       message: "BoxUser Not Found",
      //     });
      //   }

      // 51.144970853646306, 5.001387137764788
      // loc = transform.forward({ x: 5.001387137764788, y: 51.144970853646306 });

      // https://services.terrascope.be/wms/v2?service=WMS&version=1.3.0&request=GetMap&layers=CGS_S2_FAPAR&format=image/png&time=2020-06-01&width=664&height=40&bbox=554834.5451723977,6647575.392530767,558532.1841690633,6647928.91419327&styles=&srs=EPSG:3857

      console.log(math.pi);

      // 51.179614996899495, 5.124578557925347;
      //get square
      var lat1 = 51.179614996899495;
      var lon1 = 5.124578557925347;

      // 51.150194857436205, 4.994951883263392

      //ook
      var terein = 1500;

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
      console.log(lat2, lon2);

      var lat3 = lat1 - (dLat * 90) / math.pi;
      var lon3 = lon1 - (dLon * 180) / math.pi;
      console.log(lat3, lon3);

      //       51.149836994590764 4.981306842985755
      // 51.06000546589713 4.924956792648802

      //get images
      var firstProjection = "+proj=longlat +datum=WGS84 +no_defs";
      var secondProjection =
        "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs";
      //I'm not going to redefine those two in latter examples.

      var coo1 = proj4(firstProjection, secondProjection, [lon2, lat2]);

      var coo2 = proj4(firstProjection, secondProjection, [lon3, lat3]);

      // 51.14781235867085, 5.01462099231408

      var scale = 0.5;
      var width = (
        (math.max(coo1[0], coo2[0]) - math.min(coo1[0], coo2[0])) *
        scale
      ).toFixed(0);
      var height = (
        (math.max(coo1[1], coo2[1]) - math.min(coo1[1], coo2[1])) *
        scale
      ).toFixed(0);

      console.log(width, height);

      var imgurl1 =
        "https://services.terrascope.be/wms/v2?service=WMS&version=1.3.0&request=GetMap&layers=CGS_S2_FAPAR&format=image/png&time=2020-06-01&width=" +
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
        co1: coo1,
        co2: coo2,
        url: url,
        url2:
          "https://services.terrascope.be/wms/v2?service=WMS&version=1.3.0&request=GetMap&layers=CGS_S2_FAPAR&format=image/png&time=2020-06-01&width=1920&height=592&bbox=556945.9710290054,6657998.9149440415,575290.8578174476,6663655.255037144&styles=&srs=EPSG:3857",
      });

      //boxUser
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
