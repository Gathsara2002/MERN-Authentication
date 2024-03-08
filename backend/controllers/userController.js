const userModel = require("../models/userModel");

const loginUser = async (req, res) => {
  res.json({ msg: "login user" });
};

const singupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = userModel.signupMethod(email, password);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = { loginUser, singupUser };
