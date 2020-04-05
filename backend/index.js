"use strict";
const express = require("express");
const app = express();
const configRoutes = require("./routes");

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
configRoutes(app);

app.listen(3001, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
