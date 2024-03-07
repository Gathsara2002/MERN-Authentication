const userModel = require("../models/userModel");

const loginUser = async (req, res) => {
  res.json({ msg: "login user" });
};

const singupUser = async (req, res) => {
  res.json({ msg: "signup user" });
};

module.exports = { loginUser, singupUser };
