// Handles user registration and login logic

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

// Register a new user
const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ error: "Username and password are required" });

  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    await User.create({ username, password_hash: hashedPassword });
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "Username already exists" });
    }
    console.error(err);
    res.status(500).json({ error: "An error occurred during registration" });
  }
};

// Login a user and return JWT token
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ error: "Username and password are required" });

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isPasswordValid = bcrypt.compareSync(password, user.password_hash);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    res.status(200).json({ auth: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred during login" });
  }
};

module.exports = { register, login };
