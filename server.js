const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/players", require("./routes/players"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
