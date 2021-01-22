//express framework
const express = require("express");
//app object
const app = express();

//main 
app.get("/", (req, res) => {res.send("Api has loaded succesfully" )});

//routes
    //box
    const boxRoute = require("./app/routes/boxRoute");
    app.use('/box' , boxRoute);

    //user
    const userRoute = require("./app/routes/userRoute");
    app.use('/users' , userRoute);

    //boxuser
    const boxuserRoute = require("./app/routes/boxuserRoute");
    app.use('/boxUser' , boxuserRoute);

    //monitoring
    //const monitoringRoute = require("./app/routes/monitoringRoute");
    //app.use('/monitoring' , monitoringRoute);

    //sensorbox
    //const sensorboxRoute = require("./app/routes/sensorboxRoute");
    //app.use('/sensorbox' , sensorboxRoute);

    //sensor
    //const sensorRoute = require("./app/routes/sensorRoute");
    //app.use('/sensors' , sensorRoute);

    //measurement
    //const measurementRoute = require("./app/routes/measurementRoute");
    //app.use('/measurements' , measurementRoute);

    //sensortype
    //const sensortypeRoute = require("./app/routes/sensortypeRoute");
    //app.use('/sensortypes' , sensortypeRoute);


//Listen to port (non static)
const port =  process.env.Port || 5000;
app.listen(port, () => {
    console.log("Server is listening to port " + port + "...");
});