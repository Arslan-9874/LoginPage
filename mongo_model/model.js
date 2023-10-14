const mongoose = require("mongoose")
const validator = require("validator")

const loginSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        validate: [ validator.isEmail, "Email should have a valid syntax e.g: example@example.com" ]
    },
    phone: String,
    gender: String,
    password: String
  });

  const loginInfo = mongoose.model('loginInfo', loginSchema);

  module.exports = loginInfo;