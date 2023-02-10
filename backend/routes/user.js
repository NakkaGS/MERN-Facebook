const express = require("express")
const { register } = require("../controllers/user")

const router = express.Router()

// router.get('/', (req,res) => {
//     res.send('Welcome from Backend')
// })

router.post("/register", register)

module.exports = router

