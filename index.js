const express = require('express')

const app = express()

app.get('/', async (req, res) => {
    res.send('hello')
})

app.listen(process.env.PORT, () => {
    console.log('teste')
})