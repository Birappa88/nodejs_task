const orderModel = require("../models/orderModel")
const userModel = require("../models/userModel")
const mongoose = require("mongoose")

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};
/*----------------------------------------------------------------------------------------------------------------------------*/

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
};

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
};

const phoneRegex = /^((\+91)?|91)?[6789][0-9]{9}$/;


const addOrder = async (req, res) => {
    try {

        const data = req.body;
        const { userId, phoneNumber, sub_total } = data;

        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Enter data to create order" })
        }

        const userExist = await userModel.findOne({ _id: userId })
        if (!userExist) {
            return res.status(404).send({ status: false, message: "User is not found with this UserId" })
        }

        if (!isValid(phoneNumber)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter Phone number" });
        }

        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).send({
                status: false,
                message: `${phone} is not valid Phone number`,
            });
        }

        if (userExist.phoneNumber != phoneNumber) {
            return res.status(400).send({ status: false, message: `Phone Number is not for this user` })
        }

        const CreatedOrder = await orderModel.create(data)

        return res.status(201).send({ status: true, message: "Order is placed Successfully.", data: CreatedOrder })

        /*----------------------------------------------------------------------------------------------------------------------------*/

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}



const getOrder = async (req, res) => {
    try {

        const userId = req.query.user_id;

        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "Given UserId is not valid" })
        }

        const userExist = await userModel.findOne({ _id: userId })
        if (!userExist) {
            return res.status(404).send({ status: false, message: "User is not found with this UserId" })
        }

        const orderDetails = await orderModel.find({ userId: userId })

        if (!orderDetails) {
            return res.status(400).send({ status: false, message: `Your Order is not placed` })
        }

        return res.status(200).send({ status: true, message: "Order detail is fetched succesfully", data: orderDetails })

        /*----------------------------------------------------------------------------------------------------------------------------*/

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { addOrder, getOrder }