//DataBase connection
const pool = require("../db/db"); 

//Get all boxusers
const boxuser_indexs = async (req, res) => {
    try {
      const allBoxusers = await pool.query("SELECT * FROM boxuser");       

      if (allBoxusers.rows[0] == null) {
          res.status(404).send("There are no boxusers yet..." );
      } else {
          res.json(allBoxusers.rows);
      }
  } catch(err) {
      console.error(err.message)
  }
}

//Get one boxuser 
const boxuser_index = async (req, res) => {
  const { id } = req.params;
  try {
      const boxuser = await pool.query("SELECT * FROM boxuser WHERE boxuserid = $1",[id]);      
      if (boxuser.rows[0]==null) {
          res.status(404).send("There is no such boxuser..." );
      } else {
          res.json(boxuser.rows[0]);
      }
  } catch(err) {
      console.error(err.message)
  }
}

//Create a boxuser 
const boxuser_create = async  (req, res) => {
  try {
    const { userid,startdate,enddate } = req.body;
    const newBoxuser = await pool.query("INSERT INTO boxuser (userid,startdate,enddate) VALUES ($1,$2,$3) RETURNING *", [userid,startdate,enddate])
    res.json(newBoxuser.rows[0]);
} catch(err) {
    console.error(err.message)
}
}

//Update a boxuser 
const boxuser_update = async  (req, res) => {
  try {
    const { id } = req.params; //WHERE
    const { userid,startdate,enddate } = req.body;
    const updateBoxuser = await pool.query("UPDATE boxuser SET userid = $1 WHERE boxuserid = $2",[userid, id]);  
                      await pool.query("UPDATE boxuser SET startdate = $1 WHERE boxuserid = $2",[startdate, id]);  
                      await pool.query("UPDATE boxuser SET enddate = $1 WHERE boxuserid = $2",[enddate, id]);  
    res.json("Boxuser was updated");
} catch(err) {
    console.error(err.message)
}
}

//Delete a user 
const boxuser_delete =  async (req, res) => {
  try {
    const { id } = req.params; //WHERE
    const deleteUser = await pool.query("DELETE FROM boxuser WHERE boxuserid = $1",[id]);  
    res.json("Boxuser was deleted");
} catch(err) {
    console.error(err.message)
}
}

//Export controller functions
module.exports = {
    boxuser_indexs,
    boxuser_index,
    boxuser_create,
    boxuser_update,
    boxuser_delete
}