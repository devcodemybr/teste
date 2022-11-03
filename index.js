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

app.listen(process.env.PORT, () => {
    console.log('teste')
})