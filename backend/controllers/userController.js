const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const singupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.signupMethod(email, password);

    //create token and send in response
    const token = createToken(user._id);

    res.status(200).json({ user: user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//create token
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "5d" });
};

module.exports = { loginUser, singupUser };
