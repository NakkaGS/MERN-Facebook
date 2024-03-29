//Helpers
const { sendVerificationEmail, sendResetCode } = require("../helpers/mailer");
const { generateToken } = require("../helpers/tokens");
const { generateCode } = require("../helpers/generateCode");
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");

//Model
const User = require("../models/User");
const Code = require("../models/Code");

//JSON Web Token
const jwt = require("jsonwebtoken");

//Create Hash
const bcrypt = require("bcrypt");

/////////////////////////////////////////////////
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
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid Email Address",
      });
    }

    //console.log(validateEmail(email))
    //Check if the email already exists on the DB
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "This email address already exists, try with a different email address",
      });
    }

    //Check if the input it between 3 and 30
    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "First name must have between 3 and 30 characters",
      });
    }

    //Check if the input it between 3 and 30
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "Last name must have between 3 and 30 characters",
      });
    }

    //Check if the input it between 6 and 40
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "Password must have between 6 and 40 characters",
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    let tempUsername = first_name + last_name;

    let newUsername = await validateUsername(tempUsername);

    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );

    //console.log(emailVerificationToken);
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);

    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register Success! Please ative your email to start",
    });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

/////////////////////////////////////////////////
exports.activateAccount = async (req, res) => {
  try {
    const validUser = req.user.id;

    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);

    const check = await User.findById(user.id);

    //It is to make sure that when the user activate the account using the email, it checks that it is the right user
    if (validUser !== user.id) {
      return res
        .status(400)
        .json({
          message:
            "You don't have the authorization to complete this operation",
        });
    }
    if (check.verified === true) {
      return res
        .status(400)
        .json({ message: "This email is already activated" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: "Account has been activated successfully" });
    }
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

/////////////////////////////////////////////////
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Search for the User using the email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({
          message:
            "The email address you entered is not connected to an account",
        });
    }

    //Check if the password matches with the account
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res
        .status(400)
        .json({ message: "Invalid credentials. Please try again" });
    }

    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
    });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

/////////////////////////////////////////////////
exports.auth = async (req, res) => {
  res.json("Welcome from auth");
};

/////////////////////////////////////////////////
exports.sendVerification = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (user.verified == true) {
      return res.status(400).json({
        message: "This account is already activated",
      });
    }
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    return res.status(200).json({
      message: "Email verification link has been sent to your email",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/////////////////////////////////////////////////
exports.findUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res.status(400).json({
        message: "Account does not exist",
      });
    }
    return res.status(200).json({
      email: user.email,
      picture: user.picture,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/////////////////////////////////////////////////
exports.sendResetPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select("-password");
    await Code.findOneAndRemove({ user: user._id });
    const code = generateCode(5);

    const savedCode = await new Code({
      code,
      user: user._id,
    }).save();
    sendResetCode(user.email, user.first_name, code);

    return res.status(200).json({
      message: "Email reset code has been sent to your email",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.validateResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    const Dbcode = await Code.findOne({ user: user.id });
    if (Dbcode.code !== code) {
      return res.status(400).json({
        message: "Verification code is wrong.",
      });
    }
    return res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  const { email, password } = req.body;

  const cryptedPassword = await bcrypt.hash(password, 12);
  await User.findOneAndUpdate(
    { email },
    {
        password: cryptedPassword,
    }
  )
  return res.status(200).json({ message: "ok" })
};
