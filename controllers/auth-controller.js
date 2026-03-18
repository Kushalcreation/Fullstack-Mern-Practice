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
    console.error("ERROR:", error); // 👈 MUST ADD
    res.status(500).json({ msg: "page not found" });
  }
};

module.exports = { home, register };
