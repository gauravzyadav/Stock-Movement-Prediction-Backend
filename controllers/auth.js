const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: `Invalid Input. ${errors.array()[0].msg}`,
        param: errors.array()[0].param,
        error: errors.array()[0],
        success: false,
      });
    }

    const user = new User(req.body);
    const savedUser = await user.save();

    return res.json({
      message: "User signed up successfully.",
      success: true,
      data: {
        first_name: savedUser.first_name,
        email: savedUser.email,
        id: savedUser._id,
        user_id: savedUser.user_id,
        full_name: savedUser.full_name,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error.stack);  // Log the full error stack
    return res.status(400).json({
      message: "Error signing up user.",
      error: error.message,
      success: false,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: `Invalid Input. ${errors.array()[0].msg}`,
        param: errors.array()[0].param,
        error: errors.array()[0],
        success: false,
      });
    }

  const {user_id, password} = req.body; 

    const user = await User.findOne({ user_id: user_id });

    if (!user) {
      return res.status(400).json({
        message: "User does not exist.",
        success: false,
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        message: "UserID or password does not match.",
        success: false,
      });
    }

    // Create token and save in cookie
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.cookie("token", token, { expire: new Date() + 9999 });

    const { first_name, email, _id: id, full_name } = user;

    return res.json({
      message: "User signed in successfully.",
      success: true,
      data: {
        token,
        first_name,
        user_id,
        email,
        id,
        full_name,
      },
    });
  } catch (error) {
    console.error("Error during signin:", error.stack);  // Log the full error stack
    return res.status(500).json({
      message: "An error occurred during sign-in.",
      error: error.message,
      success: false,
    });
  }
};

exports.signout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({
      message: "User signed out successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error during signout:", error.stack);  // Log the full error stack
    return res.status(500).json({
      message: "Error during signout.",
      error: error.message,
      success: false,
    });
  }
};

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  requestProperty: "auth",
  algorithms: ["HS256"],
});

exports.isAuthenticated = (req, res, next) => {
  try {
    let checker = req.profile && req.auth && req.profile._id === req.auth._id;
    if (!checker) {
      return res.status(403).json({
        message: "ACCESS DENIED",
        error: "ACCESS DENIED",
        success: false,
      });
    }

    next();
  } catch (error) {
    console.error("Error in isAuthenticated middleware:", error.stack);  // Log the full error stack
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message,
      success: false,
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.profile.role === 0) {
      return res.status(403).json({
        message: "You are not ADMIN, Access denied",
        error: "You are not ADMIN, Access denied",
        success: false,
      });
    }
    next();
  } catch (error) {
    console.error("Error in isAdmin middleware:", error.stack);  // Log the full error stack
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message,
      success: false,
    });
  }
};
