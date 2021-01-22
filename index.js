var PORT = process.env.PORT || 5000;
const express = require("express");
const app = express();
// const pool = require("./db");

app.use(express.json()); // -> req.body

//ROUTES

app.get("/test", async (req, res) => {
  try {
    res.json("Dev mode");

  } catch (err) {
    console.error(err.message);
  }
});

// //Get all boxes
// app.get("/box", async (req, res) => {
//   try {
//     const allBoxes = await pool.query("SELECT * FROM box");
//     res.json(allBoxes.rows);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //Get a box
// app.get("/box/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const box = await pool.query("SELECT * FROM box WHERE boxId = $1", [id]);
//     res.json(box.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //Create a box
// app.post("/box", async (req, res) => {
//   try {
//     const { macaddress, name, comment, active } = req.body;
//     const newBox = await pool.query(
//       "INSERT INTO box (macaddress,name,comment,active) VALUES ($1,$2,$3,$4) RETURNING *",
//       [macaddress, name, comment, active]
//     );
//     res.json(newBox.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //Update a box
// app.put("/box/:id", async (req, res) => {
//   try {
//     const { id } = req.params; //WHERE
//     const { macaddress, name, comment, active } = req.body;
//     const updateBox = await pool.query(
//       "UPDATE box SET macaddress = $1 WHERE boxid = $2",
//       [macaddress, id]
//     );
//     await pool.query("UPDATE box SET name = $1 WHERE boxid = $2", [name, id]);
//     await pool.query("UPDATE box SET comment = $1 WHERE boxid = $2", [
//       comment,
//       id,
//     ]);
//     await pool.query("UPDATE box SET active = $1 WHERE boxid = $2", [
//       active,
//       id,
//     ]);
//     res.json("Box was updated");
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //Delete a box
// app.delete("/box/:id", async (req, res) => {
//   try {
//     const { id } = req.params; //WHERE
//     const deleteBox = await pool.query("DELETE FROM box WHERE boxid = $1", [
//       id,
//     ]);
//     res.json("Box was deleted");
//   } catch (err) {
//     console.error(err.message);
//   }
// });

//Listen to port
app.listen(PORT, () => {
  console.log("Server is listening to port " + PORT);
});
