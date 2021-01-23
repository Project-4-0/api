//imports
const express = require("express");
const cors = require("cors");
const client = require("./app/db/db");

const app = express();
//everyone can connect to API
var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

app.use(express.json()); // -> req.bodys

//conection posgress

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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send({ error: "Not found" });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).send({ error: err });
});

var PORT = process.env.PORT || 5000;
//Listen to port
app.listen(PORT, () => {
  console.log("Server is listening to port " + PORT);
});
