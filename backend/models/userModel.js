const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: Number,
    required: true,
  },
});

//static signup method
userSchema.statics.signupMethod = async function (email, password) {
  //check email already stored in db
  const exists = this.findOne({ email });

  if (exists) {
    throw Error("User already exists!");
  }

  //generate salt
  const salt = await bcrypt.salt(10);
  //hash password
  const hashPassword = await bcrypt.hash(password, salt);
  //save user in db
  const user = await this.create({ email: email, password: hashPassword });

  return user;
};

module.exports = mongoose.model("User", userSchema);
