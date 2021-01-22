//DataBase connection
const pool = require("../db/db"); 

//Get all boxes
const box_indexs = async (req, res) => {
    try {
      const allBoxes = await pool.query("SELECT * FROM box");       

      if (allBoxes.rows[0] == null) {
          res.status(404).send("There are no boxes..." );
      } else {
          res.json(allBoxes.rows);
      }
  } catch(err) {
      console.error(err.message)
  }
}

//Get one box 
const box_index = async (req, res) => {
  const { id } = req.params;
  try {
      const box = await pool.query("SELECT * FROM box WHERE boxid = $1",[id]);      
      if (box.rows[0]==null) {
          res.status(404).send("There is no such box..." );
      } else {
          res.json(box.rows[0]);
      }
  } catch(err) {
      console.error(err.message)
  }
}

//Create a box 
const box_create = async  (req, res) => {
  try {
    const { macadress,name,comment,active } = req.body;
    const newBox = await pool.query("INSERT INTO box (macadress,name,comment,active) VALUES ($1,$2,$3,$4) RETURNING *", [macadress,name,comment,active])

    if (req.body.name == null || req.body.name.length < 3) {
        res.status(404).send("This box needs a name of atleast 3 chaaracters" );} 
    if (req.body.macadress == null) {
        res.status(404).send("This box needs a macadress" );}
    else {
        res.json(newBox.rows[0]);}
} catch(err) {
    console.error(err.message)
}
}

//Update a box 
const box_update = async  (req, res) => {
  try {
    const { id } = req.params; //WHERE
    const { macadress, name, comment, active } = req.body;
    const updateBox = await pool.query("UPDATE box SET macadress = $1 WHERE boxid = $2",[macadress, id]);  
                      await pool.query("UPDATE box SET name = $1 WHERE boxid = $2",[name, id]);  
                      await pool.query("UPDATE box SET comment = $1 WHERE boxid = $2",[comment, id]);  
                      await pool.query("UPDATE box SET active = $1 WHERE boxid = $2",[active, id]);  
    res.json("Box was updated");
} catch(err) {
    console.error(err.message)
}
}

//Delete a box 
const box_delete =  async (req, res) => {
  try {
    const { id } = req.params; //WHERE
    const deleteBox = await pool.query("DELETE FROM box WHERE boxid = $1",[id]);  
    res.json("Box was deleted");
} catch(err) {
    console.error(err.message)
}
}

//Export controller functions
module.exports = {
  box_indexs,
  box_index,
  box_create,
  box_update,
  box_delete
}