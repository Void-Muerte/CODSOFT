const { StatusCodes } = require("http-status-codes");
const { findAllUsers } = require("../services/user.service");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    if (!users?.length) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Not users are found!" });
    }
    return res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
};
