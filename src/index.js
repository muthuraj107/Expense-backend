const express = require("express");
//const dbConfig = require("./config/db.config");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const expense=require('./Routes/Tracker.apiRoutes')
mongoose.Promise = global.Promise;


const app=express();
const port = process.PORT||4000;


//
mongoose
  .connect(process.env.mongoose_connection)
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log("could not connect to the database");
    // process.end()
  });
  

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());


app.use("/api",expense);


  app.listen(port, () => {
    console.log(`Node serer is listenings on port${port}`);
  });