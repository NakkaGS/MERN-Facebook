const { validateEmail, validateLength, validateUsername } = require("../helpers/validation")

const { generateToken } = require("../helpers/tokens")

const { sendVerificationEmail } = require("../helpers/mailer")

const User = require("../models/User");

const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            password,
            username,
            bYear,
            bMonth,
            bDay,
            gender,
        } = req.body;

        //Check if the email has all the tight parameter
        if(!validateEmail(email)) {
            return res.status(400).json({
                message: "Invalid Email Address"
            })
        }

        //console.log(validateEmail(email))
        //Check if the email already exists on the DB
        const check = await User.findOne ({ email });
        if(check){
            return res.status(400).json({
                message: "This email address already exists, try with a different email address"
            })
        }

        //Check if the input it between 3 and 30
        if(!validateLength(first_name, 3, 30)) {
            return res.status(400).json({
                message: "First name must have between 3 and 30 characters"
            })
        }

        //Check if the input it between 3 and 30
        if(!validateLength(last_name, 3, 30)) {
            return res.status(400).json({
                message: "Last name must have between 3 and 30 characters"
            })
        }

        //Check if the input it between 6 and 40
        if(!validateLength(password, 6, 40)) {
            return res.status(400).json({
                message: "Password must have between 6 and 40 characters"
            })
        }

        const cryptedPassword = await bcrypt.hash(password, 12)

        let tempUsername = first_name + last_name;

        let newUsername = await validateUsername(tempUsername)

        const user = await new User ({
            first_name,
            last_name,
            email,
            password: cryptedPassword,
            username: newUsername,
            bYear,
            bMonth,
            bDay,
            gender,
        }).save()

        const emailVerificationToken = generateToken({id: user._id.toString()}, 
        '30m')

        //console.log(emailVerificationToken);
        const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`
        sendVerificationEmail(user.email, user.first_name, url)

        const token = generateToken({ id : user._id.toString()}, "7d")

        res.send({
            id: user._id,
            username: user.username,
            picture: user.picture,
            first_name: user.first_name,
            last_name: user.last_name,
            token: token,
            verified: user.verified,
            message: 'Register Success! Please ative your email to start'
        })
        
    } catch(error) {
        res.status(500).json({Message: error.message})
    }
    
}