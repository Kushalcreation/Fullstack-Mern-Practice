const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome To The Home page");
  } catch (error) {
    res.status(400).send({ msg: "page not found" });
  }
};

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "email already exists " });
    }

    //hash the password
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    const token = await userCreated.generateToken();

    console.log("TOKEN =>", token);

    res.status(201).json({
      msg: "registration successful",
      token: token,
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json("internal server error");
  }
};

// User login logic

const login = async (req, res) => {
  try {
    console.log("log is runnning well");
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const user = await bcrypt.compare(password, userExist.password);

    if (user) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid emial or password" });
    }
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

module.exports = { home, register, login };
