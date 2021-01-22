//express framework
var PORT = process.env.PORT || 5000;

const express = require("express");
//app object
const app = express();

express.json(); // -> req.body
//main 
app.get("/", (req, res) => {
    res.send("Api has loaded succesfully" );
    });

//routes
    //box
    const boxRoute = require("./app/routes/boxRoute");
    app.use('/box' , boxRoute);

    //user
    //require("./app/routes/user.routes")(app);
    //boxuser
    //require("./app/routes/boxuser.routes")(app);
    //monitoring
    //require("./app/routes/monitoring.routes")(app);
    //sensorbox
    //require("./app/routes/sensorbox.routes")(app);
    //sensor
    //require("./app/routes/sensor.routes")(app);
    //measurement
    //require("./app/routes/measurement.routes")(app);
    //sensortype
    //require("./app/routes/sensortype.routes")(app);
// const pool = require("./db");
app.use(express.json()); // -> req.body

//Listen to port
app.listen(PORT, () => {
  console.log("Server is listening to port " + PORT);
});
