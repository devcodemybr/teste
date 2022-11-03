const express = require('express')
const { User } = require('./models/index')


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

app.listen(process.env.PORT || 3000, () => {
    console.log('teste')
})