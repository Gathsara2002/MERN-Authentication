const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup method
userSchema.statics.signupMethod = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("Email or Password is null!");
  }
  
  //check email already stored in db
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("User already exists!");
  }

  //generate salt
  const salt = await bcrypt.genSalt(10);
  //hash password
  const hashPassword = await bcrypt.hash(password, salt);
  //save user in db
  const user = await this.create({ email: email, password: hashPassword });

  return user;
};

module.exports = mongoose.model("User", userSchema);
