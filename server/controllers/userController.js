const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};
/*----------------------------------------------------------------------------------------------------------------------------*/

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
};

const stringRegex = /^[a-zA-Z0-9-, ]{1,30}$/;

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;

const phoneRegex = /^((\+91)?|91)?[6789][0-9]{9}$/;


const addUser = async function (req, res) {
    try {

        let data = req.body;
        let { name, phoneNumber, password } = data;
        /*----------------------------------------------------------------------------------------------------------------------------*/

        if (!isValidRequestBody(data)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter data to create User" });
        }
        /*----------------------------------------------------------------------------------------------------------------------------*/

        if (!isValid(name)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter valid firstName" });
        }
        if (!stringRegex.test(name)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter valid firstName" });
        }

        if (!isValid(password)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter password" });
        }
        if (!passwordRegex.test(password)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter valid password" });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        data.password = passwordHash;

        if (!isValid(phoneNumber)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter Phone number" });
        }
        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).send({
                status: false,
                message: `${phoneNumber} is not valid Phone number`,
            });
        }
        let checkphone = await userModel.findOne({ phoneNumber: phoneNumber });

        if (checkphone) {
            return res.status(400).send({
                status: false,
                message: `${phoneNumber} already exists, use new Phone number`,
            });
        }

        let userCreated = await userModel.create(data);
        /*----------------------------------------------------------------------------------------------------------------------------*/

        res.status(201).send({ status: true, message: "User created Successfully", data: userCreated });

        /*----------------------------------------------------------------------------------------------------------------------------*/

    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};


const loginUser = async function (req, res) {
    try {

        let data = req.body;
        const { phoneNumber, password } = data;

        if (!isValidRequestBody(data)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter data to login" });
        }

        if (!isValid(phoneNumber)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter Phone number" });
        }

        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).send({
                status: false,
                message: `${phoneNumber} is not valid Phone number`,
            });
        }

        if (!isValid(password)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter Password to login" });
        }
        if (!passwordRegex.test(password)) {
            return res.status(400).send({
                status: false,
                message:
                    "Password is Invalid or it's length should be 8-15",
            });
        }

        const user = await userModel.findOne({ phoneNumber: phoneNumber });
        if (!user) {
            return res
                .status(404)
                .send({ status: false, message: "User not found with this PhoneNumber" });
        }

        let userPassword = await bcrypt.compareSync(password, user.password);

        if (!userPassword) {
            return res
                .status(401)
                .send({ status: false, message: "Password is not correct" });
        }

        let token = jwt.sign(
            {
                userId: user._id, //unique Id
                iat: Math.floor(Date.now() / 1000), //issued date
                exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, //expires in 24 hr
            },
            "voosh_task"
        );

        res.setHeader("Authorization", token);

        return res.status(200).send({ status: true, message: "User login Successful", data: { userId: user._id, token: token } });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};


module.exports = { addUser, loginUser }