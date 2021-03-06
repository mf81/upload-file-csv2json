const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255
  },
  role: { type: String, required: true, minlength: 2, maxlength: 10 }
});

usersSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { _id: this._id, role: this.role },
    config.get("jwtPrivateKey")
  );
};

const Users = mongoose.model("Users", usersSchema);

exports.Users = Users;
exports.usersSchema = usersSchema;
