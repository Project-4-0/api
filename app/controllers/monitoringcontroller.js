//DataBase connection
const pool = require("../db/db"); 

//Get all monitor
const monitoring_indexs = async (req, res) => {
    try {
      const allMonitoring = await pool.query("SELECT * FROM monitoring");       

      if (allMonitoring.rows[0] == null) {
          res.status(404).send("There is no data" );
      } else {
          res.json(allMonitoring.rows);
      }
  } catch(err) {
      console.error(err.message)
  }
}

//Get one data 
const monitoring_index = async (req, res) => {
  const { id } = req.params;
  try {
      const monitoring = await pool.query("SELECT * FROM monitoring WHERE monitoringid = $1",[id]);      
      if (monitoring.rows[0]==null) {
          res.status(404).send("There is no such data" );
      } else {
          res.json(monitoring.rows[0]);
      }
  } catch(err) {
      console.error(err.message)
  }
}

//Create a data 
const monitoring_create = async  (req, res) => {
  try {
    const { boxid,sdcapacity,batterystatus,batterypercentage } = req.body;
    const newMonitoring = await pool.query("INSERT INTO monitoring (monitoringid,sdcapacity,batterystatus,batterypercentage) VALUES ($1,$2,$3,$4) RETURNING *", [boxid,sdcapacity,batterystatus,batterypercentage])

    if (req.body.boxid == null ) {
        res.status(404).send("The data needs to be linked to a box." );} 
    if (req.body.sdcapacity == null) {
        res.status(404).send("We need to monitor the storage." );}
    if (req.body.sdcapacity == null) {
        res.status(404).send("we need to know the battery status." );}
    if (req.body.sdcapacity == null) {
        res.status(404).send("we need to know the battery percentage." );}
    else {
        res.json(newMonitoring.rows[0]);}
} catch(err) {
    console.error(err.message)
}
}

//Update a data 
const monitoring_update = async  (req, res) => {
  try {
    const { id } = req.params; //WHERE
    const { boxid,sdcapacity,batterystatus,batterypercentage } = req.body;
    const updateMonitoring = await pool.query("UPDATE monitoring SET boxid = $1 WHERE monitoringid = $2",[boxid, id]);  
                             await pool.query("UPDATE monitoring SET sdcapacity = $1 WHERE monitoringid = $2",[sdcapacity, id]);  
                             await pool.query("UPDATE monitoring SET batterystatus = $1 WHERE monitoringid = $2",[batterystatus, id]);  
                             await pool.query("UPDATE monitoring SET batterypercentage = $1 WHERE monitoringid = $2",[baterrypercentage, id]);  
    res.json("monitoring was updated");
} catch(err) {
    console.error(err.message)
}
}

//Delete a data 
const monitoring_delete =  async (req, res) => {
  try {
    const { id } = req.params; //WHERE
    const deleteMoitoring = await pool.query("DELETE FROM monitoring WHERE monitoringid = $1",[id]);  
    res.json("data was deleted");
} catch(err) {
    console.error(err.message)
}
}

//Export controller functions
module.exports = {
  monitoring_indexs,
  monitoring_index,
  monitoring_create,
  monitoring_update,
  monitoring_delete
}
