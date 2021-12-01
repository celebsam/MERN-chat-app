const generateToken = require("../config/generateToken");
const User = require("../models/userModel");

// @desc log the user in
// @route POST /api/user/login
// @access public
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw Error("Login failed!");
  }
};

// @desc register a new user
// @route POST /api/user/
// @access public
const register = async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw Error("All the fields must be entered");
  }

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    res.status(400);
    throw Error("This email already exists in the database");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw Error("Registration failed!");
  }
};

module.exports = { login, register };
