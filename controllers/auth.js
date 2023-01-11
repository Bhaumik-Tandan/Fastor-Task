import Counselor from "../models/counselor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const counselor = await User.findOne({ email });
    console.log("Signing in user: ",counselor);
    if (!counselor)
      return res.status(404).json({ message: "User does not exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      counselor.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { email: counselor.email, id: counselor._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({ result: "success", token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};




export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    console.log(error);
  }
};