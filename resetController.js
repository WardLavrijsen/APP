const throwError = require("./utils/throwError");
const User = require("./users/userModel");

const sendEmail = require("./utils/email");

exports.sendReset = async function (req, res) {
  if (!req.body.email) {
    return throwError("Please give an Email", 400, res);
  }
  const currentuser = await User.findOne({ email: req.body.email });
  if (!currentuser) {
    return throwError("No user Found", 404, res);
  }
  const resetToken = await currentuser.createRandomPasswordResetToken();
  currentuser.save({ validateBeforeSave: false, new: true });

  // const resetLink = `${req.protocol}://${}/`;

  await sendEmail({
    email: currentuser.email,
    subject: "Password Reset",
    message: resetToken,
  });

  res.status(200).json({
    status: "ok",
    message: "token send to email",
  });
};

exports.resetToken = function (req, res) {};
