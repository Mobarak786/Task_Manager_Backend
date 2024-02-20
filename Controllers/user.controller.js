import createError from "../Utils/createError.js";
import User from "../mongoDB/Models/user.model.js";
import bcrypt from "bcrypt";

// getting users
export const getUsers = async (req, res, next) => {
  try {
    const id = req.params.uid;
    const user = await User.findById(id).select("-password").exec();
    if (!user) {
      return next(createError(404, "user not found"));
    }
    res.status(201).send({ sucess: true, message: user });
  } catch (error) {
    next(error);
  }
};
// upadting users
export const updateUsers = async (req, res, next) => {
  try {
    const { name, oldPassword, password } = req.body;
    const userId = req.params.userId;
    if (!name) {
      return next(createError(404, "name field is required"));
    }
    //does user exist to update ?
    const user = await User.findById(userId).exec();
    if (!user) return next(createError(400, "user not found"));

    // validate old password
    if (password && oldPassword) {
      const isValidatePassword = await bcrypt.compare(
        oldPassword,
        user.password
      );

      if (!isValidatePassword) {
        return next(createError(400, "please enter a correct old password"));
      }

      // hash new password
      const hash = await bcrypt.hash(password, 10);
      // update password
      user.password = hash;
    }
    // update user name
    user.name = name;
    await user.save();
    res.status(201).send({ sucess: true, message: "user has been updated" });
  } catch (error) {
    next(error);
  }
};
