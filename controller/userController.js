const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const UserHelper = require("../utils/userHelper");

exports.createUser = async (req, res) => {
  const { errors, isValid } = UserHelper.validateRegisterInput(req.body);
  if (!isValid)
    return res.status(400).json({ errorMsg: "Validation Error", errors });

  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ errorMsg: "User already exists!!" });

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hashPassword = await bcrypt.hash(password, salt);
    if (!hashPassword) throw Error("Something went wrong hashing the password");

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    const savedUser = await newUser.save();
    if (!savedUser) throw Error("Something went wrong saving the user");

    let updateLogin = await updateLoginInfo(user);
    console.log("<<<<<<<<<<<<<<<<",updateLogin);
    if(!updateLogin) {
      throw Error("Daily Limit Reached!!");
    }

    const token = UserHelper.issueJWT(savedUser);
    res
      .status(200)
      .header({ Authorization: token })
      .json({
        user: {
          id: savedUser.id,
          name: savedUser.name,
          email: savedUser.email,
        },
      });
  } catch (e) {
    console.error("Method::createUser. Error: " + e.message);
    res.status(400).json({ errorMsg: "Something went wrong!!" });
  }
};

exports.loginUser = async (req, res) => {
  const isValid = UserHelper.validateLoginInput(req.body);
  if (!isValid)
    return res.status(400).json({ errorMsg: "Invalid Email or Password!!" });

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw Error("User not found!!");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error("Invalid Email or Password!!");
    let updateLogin = await updateLoginInfo(user);
    console.log("<<<<<<<<<<<<<<<<",updateLogin);
    if(!updateLogin) {
      throw Error("Daily Limit Reached!!");
    }

    const token = UserHelper.issueJWT(user);
    if (!token) {
      console.error("Couldn't issue the token!!");
      throw Error("Something Went Wrong!!");
    }

    res
      .status(200)
      .header({ Authorization: token })
      .json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (e) {
    res.status(400).json({ errorMsg: e.message });
  }
};

exports.autoLoginUser = async (req, res) => {
  try {
    const user = await User.findById(req.userInfo._id).select("-password");
    if (!user) throw Error("User Does not exist");
    res
      .status(200)
      .json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

const updateLoginInfo = async (user) => {
  const id = user._id;
  const existingCount = user.loginCount || 0;
  let lastLogin = user.lastLogin || new Date();
  lastLogin = UserHelper.formatDate(lastLogin);
  if(lastLogin == UserHelper.formatDate(new Date()) && existingCount >= 10) {
    return false;
  }
  try {
    const data = {
      loginCount: user.loginCount + 1,
      lastLogin : new Date(),
    };
    const userInfo = await User.findOneAndUpdate({_id : id}, data, { useFindAndModify: false,new: true });
    
    if (!userInfo) throw Error("Error updating login info");
    return true;
  } catch (e) {
    console.error(e.message);
    return false;
  }
};
