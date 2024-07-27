import express from "express";
import dotenv from "dotenv";
import booksRoute from "./routes/booksRoutes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "./models/User.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "Shashank_jwt_secret_key";

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await UserModel.findOne({ email });

    if (result) {
      return res.status(420).json({ error: "User already exists" });
    }

    const newUser = new UserModel({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log(`User with email ${email} not found.`);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Password mismatch for user ${email}.`);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res
      .cookie("token", token, { httpOnly: true })
      .json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/verify", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    res.status(200).json({ message: "Token is valid" });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

app.use("/books", booksRoute);

const PORT = process.env.PORT || 8000;
const url = process.env.mongo_URL;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

connectToMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
