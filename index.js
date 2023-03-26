const express = require("express")
const mongoose = require("mongoose")
const app = express()
require("dotenv").config()
const {connection} = require("./db")
const {route} = require("./routes/user.routes")
const {noteroute} = require("./routes/notes.routes")
const {auth} = require("./middleawre/auth")
app.use(express.json())



app.use("/user", route)

app.use(auth)

app.use("/note", noteroute)







app.listen(process.env.port, async()=> {

    try {
        await connection
        console.log("mongo")    
    } catch (error) {
        console.log(error)
    }
    
    console.log("running")
})


