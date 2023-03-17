const express = require("express")

//Controller
const { register, activateAccount, login, auth, sendVerification } = require("../controllers/user")

//Middlewares
const { authUser } = require("../middlewares/auth")

const router = express.Router()

// router.get('/', (req,res) => {
//     res.send('Welcome from Backend')
// })

router.post("/register", register)
router.post("/activate", authUser, activateAccount) //if authUser is right, then it will return req.user
router.post("/login", login)
router.post("/sendVerification", authUser, sendVerification)
//router.post("/auth", authUser, auth) //if authUser is right, then it will return req.user

module.exports = router