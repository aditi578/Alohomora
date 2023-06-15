const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const User = require("./models/userModel");

app.use(express.json());

mongoose.connect(process.env.URI).then(()=>{
    console.log("Connected Sucessfylly")
    app.listen(process.env.PORT || 8000 , (err)=>{
        if(err) console.log(err);
        console.log("Running Sucessfully at" , process.env.PORT);
    });
}).catch((error)=>{
    console.log("error" , error);
});

//Create

app.post("/" , async (req , res)=>{

    const {name ,id ,email ,mobileNo} = req.body;
    const User = require("./models/userModel");

    try {
        const userData = await User.create({
            name : name,
            id:id,
            email:email,
            mobileNo:mobileNo,
        });

        res.status(201).json(userAdded);

    } catch (error) {
        console.log(error); 
        res.status(400).json({error:error.message})
    }
});

app.get("/" , (req ,res)=> {
    res.send("api running");
})

