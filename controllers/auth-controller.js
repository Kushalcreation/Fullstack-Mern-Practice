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
    res.status(200).json({ message: req.body });
  } catch (error) {
    res.status(400).json({ msg: "page not found" });
  }
};

module.exports = { home, register };
