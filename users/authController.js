const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("./userModel");
const throwError = require("../utils/throwError");
const Requests = require("../utils/Requests");

class AuthController {
  replyToken(user, status, res) {
    const id = user._id;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    res.status(status).json({
      status: "succes",
      token,
      data: {
        user,
      },
    });
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new Error("Please provide an email and password!");
      }
      const user = await User.findOne({ email }).select("+password");

      if (!user || !(await user.correctPassword(password, user.password))) {
        return throwError("Username or password is incorrect!", 401, res);
      }
      Requests.succesRequest = 1;
      this.replyToken(user, 200, res);
    } catch (err) {
      throwError(err.message, 400, res);
    }
  }

  async signup(req, res) {
    try {
      const userObject = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      };

      if (req.body.energyprice) userObject.energyprice = req.body.energyprice;

      const newUser = await User.create(userObject);
      Requests.succesRequest = 1;
      this.replyToken(newUser, 201, res);
    } catch (error) {
      throwError(error.message, 400, res);
    }
  }

  async adddevice(req, res) {
    try {
      if (!req.body.id) return throwError("Devices needs an id", 400, res);
      if (!req.body.name) return throwError("Devices needs an name", 400, res);
      if (!req.body.catagory)
        return throwError("Devices needs an catagory", 400, res);

      if (
        req.body.id.split(":")[0] !== "pmu" ||
        req.body.id.split(":")[2] !== "pmu"
      ) {
        return throwError("Not an valid ID!", 400, res);
      }

      const { id, name, catagory } = req.body;

      let token;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      } else {
        return throwError("No token", 401, res);
      }

      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decoded.id);

      if (!currentUser) return throwError("User doesn't exsists", 401, res);

      if (
        currentUser.devices.filter((device) => device.id === id).length !== 0
      ) {
        return throwError("This id already exsists", 400, res);
      }

      if (
        currentUser.devices.filter((device) => device.name === name).length !==
        0
      )
        return throwError("This name already exsists", 400, res);

      const user = await User.findByIdAndUpdate(
        decoded.id,
        {
          devices: [
            ...currentUser.devices,
            { id, name, catagory, archive: [], relaypower: 1, efficiency: 0 },
          ],
        },
        { runValidators: false, new: true }
      );

      Requests.succesRequest = 3;
      res.status(200).json({
        status: "ok",
        data: {
          devices: user.devices,
        },
      });
    } catch (error) {
      throwError(error.message, 400, res);
    }
  }
}

module.exports = new AuthController();
