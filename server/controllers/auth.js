import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      image,
      location,
      occupation,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      image,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();

    res.status(201).json({ success: true, savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "User Does Not Exists" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE);
    user.password = "Incrypted";
    res.status(200).json({ token, user, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserIds = async (req, res) => {
  try {
    const users = User.find({}, "_id");

    const userIds = (await users).map((user) => user._id);

    res.status(200).json(userIds);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
