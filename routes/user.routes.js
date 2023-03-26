const express = require("express")
const route = express.Router()
const {UserModal} = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

route.get("/", async (req, res)=> {

    try {
        const user = await UserModal.find()
        res.send(user)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

route.post("/register", async(req, res)=> {
    
    const { email, name, gender, pass } = req.body;

 try {
     bcrypt.hash(pass, 5, async (err, hash) => {

     const user = await UserModal.findOne({email: email})
       
   if(user) {
         res.status(200).send({"msg": "User is alreday register pl login"})
      }else {

             const newuser = new UserModal({email, name, gender, pass:hash})
                await newuser.save()
                res.status(200).send({"msg": "user register sucessfully"})
            }

        })
                   
    } catch (error) {
        res.status(404).send(error.message)
    }



})

route.post("/login", async(req, res)=> {
    const { email, pass } = req.body;
    try {
        const user = await UserModal.findOne({email})

        if(user) {
            bcrypt.compare(pass, user.pass, (err, result) => {
                if(result) {
                  res.status(200).send({
                    msg: "login has done",
           "token": jwt.sign({"userID": user._id }, "secretkey")})
                }else {
                  res.status(404).send({"msg": "login has not done"})    
                }
            });
        }


    } catch (error) {
        res.status(404).send(error.message)
    }


})


module.exports = {
    route
}