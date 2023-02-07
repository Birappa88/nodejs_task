const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");


const authentication = async function (req, res, next) {
    try {

        const token = req.header("Authorization");

        if (!token) {
            return res.status(400).send({ status: false, message: "Provide token for Authentication" });
        }

        let splitToken = token.split(" ");

        try {
            const decodedToken = jwt.verify(splitToken[1], "voosh_task", {
                ignoreExpiration: true,
            });
            if (Date.now() > decodedToken.exp * 1000) {
                return res.status(401).send({ status: false, message: "Your token Session expired" });
            }

            req.useId = decodedToken.userId;
        }
        catch (error) {
            return res.status(401).send({ status: false, message: "Authentication failed, Provide valid token" });
        }

        console.log("Authentication successful");

        next();

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};



const authorization = async function (req, res, next) { 
    try {
  
      const userId = req.body.userId || req.query.user_id
      /*----------------------------------------------------------------------------------------------------------------------------*/
  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res
          .status(400)
          .send({ status: false, message: "Enter valid userId" });
      }
      /*----------------------------------------------------------------------------------------------------------------------------*/
  
      const user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).send({ status: false, message: "User not found with this UserId" });
      }
      /*----------------------------------------------------------------------------------------------------------------------------*/
  
      if (req.useId != userId) {
        return res.status(401).send({ status: false, message: "You are Not Authorized to perform this task" });
      }
      /*----------------------------------------------------------------------------------------------------------------------------*/
  
      console.log("Authorization successful");
      /*----------------------------------------------------------------------------------------------------------------------------*/
  
      next();
  
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };

module.exports = { authentication, authorization }