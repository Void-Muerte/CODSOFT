const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");

/**
 * creates a new user
 * @param {String} email
 * @param {String} password
 * @param {String} role
 * @returns {Promise<User>}
 */
exports.createNewUser = async (email, password, role = "CAN") => {
  const newUser = new User({ email, password, role });
  return await newUser.save();
};
/**
 * find user by id
 * @param {mongoose.Schema.Types.ObjectId} id
 * @returns {Promise<User>}
 */
exports.findUserById = async (id) => await User.findById(id);

/**
 * Returns list of all users
 * @returns {Promise<User[]>}
 */
exports.findAllUsers = async () => await User.find({});

/**
 * Find User by Email
 * @param {String} email
 * @returns {Promise<User>}
 */

exports.findUserByEmail = async (email) => await User.findOne({ email });
/**
 * Update user password
 * @param {mongoose.Schema.Types.ObjectId} id
 * @param {String} newPassword
 * @returns {Promise<User>}
 */
exports.updateUserPassword = async (id, newPassword) =>
  await User.findByIdAndUpdate(
    id,
    { $set: { password: newPassword } },
    { new: true }
  );

/**
 * Delete user by id
 * @param {mongoose.Schema.Types.ObjectId} id
 * @returns
 */
exports.deleteUserById = async (id) => await User.findByIdAndDelete(id);
