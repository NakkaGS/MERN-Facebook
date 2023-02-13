const express = require("express")
const { register, activateAccount } = require("../controllers/user")

const router = express.Router()

// router.get('/', (req,res) => {
//     res.send('Welcome from Backend')
// })

router.post("/register", register)
router.post("/activate", activateAccount)

module.exports = router

