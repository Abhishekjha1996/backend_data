const mongoose = require("mongoose")

const noteschema = mongoose.Schema({
    title: String,
    body: String,
    device: String,
    comment: String,
    userID: String

},{
    verionKey: false
})

const NoteModal = mongoose.model("note", noteschema)


module.exports = {
    NoteModal
}