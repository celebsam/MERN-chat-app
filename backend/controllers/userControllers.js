const User = require("../models/userModel");

const login = async (req, res) => {
  res.send("This is the login api");
};
const register = async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw Error("All the fiels must be entered");
  }

  const userExist = await User.find({ email: email });
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
