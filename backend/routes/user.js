const express = require("express")
const { home } = require("../controllers/user")

const router = express.Router()

// router.get('/', (req,res) => {
//     res.send('Welcome from Backend')
// })

router.get("/user", home)

module.exports = router

