const userModel = require("../models/userModel");

const loginUser = async (req, res) => {
  res.json({ msg: "login user" });
};

const singupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.signupMethod(email, password);
    res.status(200).json({ user:user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, singupUser };
