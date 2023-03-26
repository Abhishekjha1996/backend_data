const express = require("express")
const noteroute = express.Router()
const {NoteModal} = require("../model/notes.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

noteroute.get("/", async (req, res)=> {

    try {
        const data = await NoteModal.find()
        res.status(200).send(data)

    } catch (error) {
        res.status(404).send({"msg": error.message})
    }


})

noteroute.post("/add", async (req, res)=> {
    const data = req.body

    try {
        const newdata = new NoteModal(data)
        await newdata.save()
        res.status(200).send({"msg": "notes data has been added"})
    } catch (error) {
        res.status(404).send({"msg": error.message})
    }
})

noteroute.delete("/delete/:noteID", async(req, res)=> {

    const {noteID} = req.params

    try {
        await NoteModal.findByIdAndDelete({_id: noteID})
        res.status(200).send({"msg": "notes data has been deleted"})

    } catch (error) {
        res.status(404).send({"msg": error.message})
    }
})



module.exports = {
    noteroute
}