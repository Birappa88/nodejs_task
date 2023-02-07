const mongoose = require("mongoose");

//=======================----------------->{ User Schema }<-------------=======================================//

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        phoneNumber: { type: Number, required: true, unique: true, trim: true },
        password: { type: String, required: true, trim: true, min: 8, max: 15 }
    },
    { timestamps: true }
);

//=======================----------------->{ Export }<-------------=======================================//

module.exports = mongoose.model("user", userSchema);
