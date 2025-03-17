const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const register = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ error: "Username and password are required" });

  const hashedPassword = bcrypt.hashSync(password, 8);

  db.query(
    "INSERT INTO users (username, password_hash) VALUES (?, ?)",
    [username, hashedPassword],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "User registered successfully!" });
    }
  );
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ error: "Username and password are required" });

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ error: "User not found" });

      const user = results[0];

      if (!bcrypt.compareSync(password, user.password_hash))
        return res.status(401).json({ error: "Invalid password" });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "30m", // Token expires in 5 minutes
      });

      res.status(200).json({ auth: true, token });
    }
  );
};

module.exports = { register, login };
