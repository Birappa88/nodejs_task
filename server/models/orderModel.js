const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

//=======================----------------->{ Order Shema }<-------------=======================================//

const orderSchema = new mongoose.Schema(
    {
        userId:        { type: ObjectId, required: true, trim: true, ref: "user" },
        sub_total:    { type: String,   required: true, trim: true },
        phoneNumber: { type: Number, required: true, trim: true }
    },
    { timestamps: true }
)   

//=======================----------------->{ Export }<-------------=======================================//

module.exports = mongoose.model("order", orderSchema); 