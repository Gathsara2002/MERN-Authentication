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

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid!");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong!");
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

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
