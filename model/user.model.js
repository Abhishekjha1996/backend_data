const mongoose = require("mongoose")

const userschema = mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    gender: String,
    pass: String

},{
    verionKey: false
})

const UserModal = mongoose.model("user", userschema)


module.exports = {
    UserModal
}