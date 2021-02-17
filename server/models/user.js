const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
});
//Export model
module.exports = mongoose.model("User", userSchema);
