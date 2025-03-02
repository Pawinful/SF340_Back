const express = require('express')
const mongoose = require('mongoose')

const Room = require('./models/room.model.js');
require('dotenv').config()

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGODB)
    .then(() => console.log("MongoDB connected!"))
    .catch(() => console.log("Connection Failed!"))

app.post('/api/addroom', async (req, res) => {
    try {
        const room = await Room.create(req.body);
        res.status(200).json(room);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
})

app.listen(3000, () => {
    console.log("Server is running on localhost:3000");
});

app.get('/', (req, res) => {
    res.send("Hello world from ExpressJS test nodemon 2");
});