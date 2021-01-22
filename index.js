var PORT = process.env.PORT || 5000;
const express = require("express");
const app = express();

app.use(express.json()); // -> req.body

//conection posgress
const client = require("./app/db/db");
client.connect();

client.query("SELECT NOW()", (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

//ROUTES
app.get("/test", async (req, res) => {
  try {
    res.json("Dev mode");
  } catch (err) {
    console.error(err.message);
  }
});

//Listen to port
app.listen(PORT, () => {
  console.log("Server is listening to port " + PORT);
});
