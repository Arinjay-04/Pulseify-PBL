const { string } = require("i/lib/util")
const mongoose = require("mongoose")

const FarmerSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    Number: Number,
    email: String,
    Adhar: Number,
    LAddress: String,
    LCode: Number,
    FAddress: String,
    FCode: Number,
    FArea: Number,
    password: String,
    Cpassword: String

})


const FarmerModel1 = mongoose.model("farmers", FarmerSchema)
module.exports = FarmerModel1