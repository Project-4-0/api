//express framework
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


//Listen to port (non static)
const port =  process.env.Port || 5000;
app.listen(port, () => {
    console.log("Server is listening to port " + port + "...");
});