//DataBase connection
const pool = require("../db/db"); 

//Get all users
const user_indexs = async (req, res) => {
    try {
      const allUsers = await pool.query("SELECT * FROM public.user");       

      if (allUsers.rows[0] == null) {
          res.status(404).send("There are no users..." );
      } else {
          res.json(allUsers.rows);
      }
  } catch(err) {
      console.error(err.message)
  }
}

//Get one user 
const user_index = async (req, res) => {
  const { id } = req.params;
  try {
      const user = await pool.query("SELECT * FROM public.user WHERE userid = $1",[id]);      
      if (user.rows[0]==null) {
          res.status(404).send("There is no such user..." );
      } else {
          res.json(user.rows[0]);
      }
  } catch(err) {
      console.error(err.message)
  }
}

//Create a user 
const user_create = async  (req, res) => {
  try {
    const { firstname,lastname,email,password,address,postalcode,city,usertypeid } = req.body;
    const newUser = await pool.query("INSERT INTO public.user (firstname,lastname,email,password,address,postalcode,city,usertypeid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *", [firstname,lastname,email,password,address,postalcode,city,usertypeid])

    if (req.body.firstname == null || req.body.lastname == null) {
        res.status(404).send("This user needs a firstname and lastname" );} 
    if (req.body.email == null) {
        res.status(404).send("This user needs a email" );}
    if (req.body.password == null || req.body.password.length < 6) {
        res.status(404).send("This user needs a password of atleast 6 characters" );}
    else {
        res.json(newUser.rows[0]);}
} catch(err) {
    console.error(err.message)
}
}

//Update a user 
const user_update = async  (req, res) => {
  try {
    const { id } = req.params; //WHERE
    const { firstname,lastname,email,password,address,postalcode,city,usertypeid } = req.body;
    const updateUser = await pool.query("UPDATE public.user SET firstname = $1 WHERE userid = $2",[firstname, id]);  
                      await pool.query("UPDATE public.user SET lastname = $1 WHERE userid = $2",[lastname, id]);  
                      await pool.query("UPDATE public.user SET email = $1 WHERE userid = $2",[email, id]);  
                      await pool.query("UPDATE public.user SET password = $1 WHERE userid = $2",[password, id]);  
                      await pool.query("UPDATE public.user SET address = $1 WHERE userid = $2",[address, id]);  
                      await pool.query("UPDATE public.user SET postalcode = $1 WHERE userid = $2",[postalcode, id]);  
                      await pool.query("UPDATE public.user SET city = $1 WHERE userid = $2",[city, id]);  
                      await pool.query("UPDATE public.user SET usertypeid = $1 WHERE userid = $2",[usertypeid, id]);  
    res.json("User was updated");
} catch(err) {
    console.error(err.message)
}
}

//Delete a user 
const user_delete =  async (req, res) => {
  try {
    const { id } = req.params; //WHERE
    const deleteUser = await pool.query("DELETE FROM public.user WHERE userid = $1",[id]);  
    res.json("User was deleted");
} catch(err) {
    console.error(err.message)
}
}

//Export controller functions
module.exports = {
    user_indexs,
    user_index,
    user_create,
    user_update,
    user_delete
}