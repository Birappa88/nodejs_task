//=======================----------------->{ Imports }<-------------=======================================//

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const route = require("./routes/route");
const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

//=======================----------------->{ Connection to MongoDB }<-------------=======================================//

mongoose.set('strictQuery', false);

mongoose
  .connect(
    "mongodb+srv://Birappa:MangoDB@cluster0.m5phg.mongodb.net/voosh_task",
    { 
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDB is Connected ..."))  
  .catch((err) => console.log(err));
/*----------------------------------------------------------------------------------------------------------------------------*/

app.use("/", route);

//=======================----------------->{ Connection to Express on Port }<-------------=======================================//

app.listen(process.env.PORT || 8080, function () {
  console.log("Express app running on Port-->{ " + (process.env.PORT || 8080) + " }");
});


/***********+++++*********+++++++++**********+++++++***********++++++++*******+++++++++*********++++++***********/   