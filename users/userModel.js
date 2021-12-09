const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    required: [true, "You need an email!"],
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "not an email"],
  },
  password: {
    required: [true, "You need a password!"],
    type: String,
    validate: [validator.isStrongPassword, "Not a strong password!"],
    select: false,
  },
  passwordConfirm: {
    required: [true, "You need to confirm your password!"],
    type: String,
    validate: [
      function (el) {
        return el === this.password;
      },
      "Passwords don't match",
    ],
  },
  energyprice: String,
  devices: Array,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", async function (next) {
  if (this.devices) return next();
  this.devices = [];
  next();
});

userSchema.methods.correctPassword = async function (guessPass, realpass) {
  return await bcrypt.compare(guessPass, realpass);
};

userSchema.methods.createRandomPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
