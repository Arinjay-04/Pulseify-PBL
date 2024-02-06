const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const FarmerModel1 = require('./Models/farmers')

const app = express()

const port = 3001

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/Farmer")


app.post('/login', (req,res)=>{
    const {Number, password} = req.body
    FarmerModel1.findOne({Number: Number})
    .then(user =>{
        if(user){
            if(user.password === password){
                res.status(200).json("successfull")
            }else{
               res.status(404).json("the passsword is incorrect")
            }
        }
        else{
            res.status(404).json("No such registration Exists")
        }
    })
})


app.post('/register', (req,res)=>{
    FarmerModel1.create(req.body)
    .then(farmer => {
        console.log(farmer); // Log the created farmer data
        res.json(farmer);
    })
    .catch(err => {
        console.error(err); // Log any errors
        res.status(500).json({ error: 'Internal Server Error' }); // Send error response
    });
});



app.listen(port , ()=>{
    console.log("The port is running")
})