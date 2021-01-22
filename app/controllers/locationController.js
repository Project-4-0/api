//DataBase connection
const pool = require("../db/db"); 

//Get all locations
const location_indexs = async (req, res) => {
    try {
      const allLocations = await pool.query("SELECT * FROM location");       

      if (allLocations.rows[0] == null) {
          res.status(404).send("There are no locations found..." );
      } else {
          res.json(allLocations.rows);
      }
  } catch(err) {
      console.error(err.message)
  }
}

//Get one location 
const location_index = async (req, res) => {
  const { id } = req.params;
  try {
      const location = await pool.query("SELECT * FROM location WHERE locationid = $1",[id]);      
      if (location.rows[0]==null) {
          res.status(404).send("There is no such location..." );
      } else {
          res.json(location.rows[0]);
      }
  } catch(err) {
      console.error(err.message)
  }
}

//Create a location 
const location_create = async  (req, res) => {
  try {
    const { boxuserid,latitude,longitude,startdate,enddate } = req.body;
    const newLocation = await pool.query("INSERT INTO location (boxuserid,latitude,longitude,startdate,enddate) VALUES ($1,$2,$3,$4,$5) RETURNING *", [boxuserid,latitude,longitude,startdate,enddate])

    if (req.boxuserid.boxuserid == null) {
        res.status(404).send("This location needs to belong to a boxuser" );} 
    if (req.body.latitude == null) {
        res.status(404).send("This location needs a latitude" );}
    if (req.body.longitude == null) {
        res.status(404).send("This location needs a longitude" );}
    if (req.body.startdate == null) {
        res.status(404).send("This location needs a startdate" );}
    if (req.body.enddate == null) {
        res.status(404).send("This location needs a enddate" );}
    else {
        res.json(newLocation.rows[0]);}
} catch(err) {
    console.error(err.message)
}
}

//Update a location 
const location_update = async  (req, res) => {
  try {
    const { id } = req.params; //WHERE
    const { boxuserid, latitude, longitude, startdate, enddate } = req.body;
    const updateLocation = await pool.query("UPDATE location SET boxuserid = $1 WHERE controllerid = $2",[boxuserid, id]);  
                           await pool.query("UPDATE location SET latitude = $1 WHERE controllerid = $2",[latitude, id]);  
                           await pool.query("UPDATE location SET longitude = $1 WHERE controllerid = $2",[longitude, id]);  
                           await pool.query("UPDATE location SET startdate = $1 WHERE controllerid = $2",[startdate, id]);
                           await pool.query("UPDATE location SET enddate = $1 WHERE controllerid = $2",[enddate, id]);
    res.json("location was updated");
} catch(err) {
    console.error(err.message)
}
}

//Delete a location 
const location_delete =  async (req, res) => {
  try {
    const { id } = req.params; //WHERE
    const deleteLocation = await pool.query("DELETE FROM location WHERE locationid = $1",[id]);  
    res.json("location was deleted");
} catch(err) {
    console.error(err.message)
}
}

//Export controller functions
module.exports = {
  location_indexs,
  location_index,
  location_create,
  location_update,
  location_delete
}
