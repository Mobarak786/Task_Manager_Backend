import bcrypt from "bcrypt";
import createError from "../Utils/createError.js";
import jwt from "jsonwebtoken";
import User from "../mongoDB/Models/user.model.js";

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(createError(400, "all fields must be filled"));
    }
    const user = await User.findOne({ email }).lean().exec();
    if (user) {
      return next(createError(409, "user already exist"));
    }
    const hash = bcrypt.hashSync(password, 10);

    const usersData = await User.create({
      name,
      email,
      password: hash,
    });
    res.status(201).send("user has been created");
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).lean().exec();
    if (!user) {
      return res.status(400).send("incorrect username or password");
    }

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return res.status(400).send("incorrect username or password");

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      process.env.JWT_SECRET
    );

    const { password, ...info } = user;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .send("you are logged in");
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (req, res) => {
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "none",
    })
    .status(200)
    .send("user has been logged out");
};
