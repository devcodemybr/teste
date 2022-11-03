const express = require('express')
const { User } = require('./models/index')


const app = express()

app.get('/', async (req, res) => {
    res.send('hello')
})

app.get('/users', async (req, res) => {
    const list = await User.findAll()
    return res.status(200).json(list)
})

app.post('/users', async (req, res)=> {
    const newUser = req.body;
    const userAdded = await User.create(newUser)

    return res.status(201).json(userAdded)
})

app.listen(process.env.PORT || 3000, () => {
    console.log('teste')
})