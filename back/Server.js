const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require('dns');
const openingRoutes = require("./routes/opening");
const facultyRoutes = require("./routes/faculty");
const authRoutes = require("./routes/auth");
const listingRoutes = require("./routes/listingRoutes");
const config = require("config");

// Force IPv4 resolution
dns.setDefaultResultOrder('ipv4first');

const db = config.get("db");
const server = config.get("server");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/openings", openingRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);

// Database Connection
mongoose
  .connect(db.uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    // // console.log("Connected to MongoDB");
    app.listen(server.port, '0.0.0.0', () => console.log(`Server running on ${server.hostname}:${server.port}`));
  })
  .catch((error) => console.error("Database connection failed:", error));