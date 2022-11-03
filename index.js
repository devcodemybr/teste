const express = require('express')
const { User } = require('./models/index')
const { Dog } = require("./schemas/dogs");
const db = require("./config/mongo.config");
const mongoose = require("mongoose");
const morgan = require('morgan')

const winston = require('winston');
const {Loggly} = require('winston-loggly-bulk');

winston.add(new Loggly({
    token: "05fe7c22-ed16-4064-ae47-d3e28a2ab445",
    subdomain: "devcodemyApp",
    tags: ["Winston-NodeJS"],
    json: true
}));


const app = express()

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.use(require('express-status-monitor')());

app.get('/', async (req, res) => {
  winston.log('info', "Hello World from Node.js!");z
    res.send('hello')
})

app.get('/users', async (req, res) => {
    const list = await User.findAll()
    winston.log('info', "retrieve all users!");
    return res.status(200).json(list)
})

app.post('/users', async (req, res)=> {

    const userAdded = await User.create(req.body)
    winston.log('info', "create one user!");
    return res.status(201).json(userAdded)
})

app.get("/dogs", async (req, res) => {
    const allDogs = await Dog.find();
    winston.log('info', "retrieve all dogs!");
    return res.status(200).json(allDogs);
});

app.post("/dogs", async (req, res) => {
    const newDog = new Dog({ ...req.body });
    const insertedDog = await newDog.save();
    winston.log('info', "create one dog!");
    return res.status(201).json(insertedDog);
  });

const start = async () => {
    try {
      await mongoose.connect(db.uri, { useNewUrlParser: true });
      winston.log('info', "app startup");
      app.listen(process.env.PORT || 3000, () => console.log("Server started on port 3000"));
    } catch (error) {
      winston.log('error', error);
      console.error(error);
      process.exit(1);
    }
  };
  
  start();