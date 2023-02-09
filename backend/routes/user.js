const express = require("express")

const router = express.Router()

router.get('/', (req,res) => {
    res.send('Welcome from Home')
})

router.get('/books', (req,res) => {
    res.send('Welcome from Books')
})

module.exports = router