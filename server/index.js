const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const authRouter = require("./routes/auth-route");
const blogRouter = require("./routes/blog-route");

dotenv.config();

// set up server

const app = express();

const mongoDB = process.env.DEV_DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: ["http://localhost:3001"],
    credentials: true,
  })
);

app.use("/auth", authRouter);
app.use("/blog", blogRouter);
