const express = require('express')
const { User } = require('./models/index')
const { Dog } = require("./schemas/dogs");
const db = require("./config/mongo.config");
const mongoose = require("mongoose");


const app = express()
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.send('hello')
})

app.get('/users', async (req, res) => {
    const list = await User.findAll()
    return res.status(200).json(list)
})

app.post('/users', async (req, res)=> {

    const userAdded = await User.create(req.body)

    return res.status(201).json(userAdded)
})

app.get("/dogs", async (req, res) => {
    const allDogs = await Dog.find();
    return res.status(200).json(allDogs);
});

app.post("/dogs", async (req, res) => {
    const newDog = new Dog({ ...req.body });
    const insertedDog = await newDog.save();
    return res.status(201).json(insertedDog);
  });

const start = async () => {
    try {
      await mongoose.connect(db.uri, { useNewUrlParser: true });
      app.listen(process.env.PORT || 3000, () => console.log("Server started on port 3000"));
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  start();