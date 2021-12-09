const crypto = require("crypto");

const throwError = require("./utils/throwError");
const User = require("./users/userModel");

const sendEmail = require("./utils/email");

exports.sendReset = async function (req, res) {
  try {
    if (!req.body.email) {
      return throwError("Please give an Email", 400, res);
    }
    const currentuser = await User.findOne({ email: req.body.email });
    if (!currentuser) {
      return throwError("No user with this email exsists", 404, res);
    }
    const resetToken = await currentuser.createRandomPasswordResetToken();
    currentuser.save({ validateBeforeSave: false, new: true });

    const resetLink = `${req.protocol}://${req.get(
      "host"
    )}/resetpassword?token=${resetToken}`;

    try {
      await sendEmail({
        email: currentuser.email,
        subject: "Password Reset",
        message: resetLink,
      });

      res.status(200).json({
        status: "ok",
        message: "token send to email",
      });
    } catch (err) {
      currentuser.passwordResetToken = undefined;
      currentuser.passwordResetExpires = undefined;
      await currentuser.save({ validateBeforeSave: false });
      return throwError("There was an error sending the email", 500, res);
    }
  } catch (err) {
    return throwError(err, 400, res);
  }
};

exports.resetToken = async function (req, res) {
  try {
    if (!req.body.password || !req.body.password) {
      return throwError(
        "Please send a password and password confirm",
        400,
        res
      );
    }
    if (!req.query.token) {
      return throwError("no token", 400, res);
    }
    const hashToken = crypto
      .createHash("sha256")
      .update(req.query.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) return throwError("token is invalid or has expired!", 400, res);

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;
    await user.save();

    res.status(200).json({
      status: "ok",
      message: "password succesfully resetted",
    });
  } catch (err) {
    return throwError(err, 400, res);
  }
};
