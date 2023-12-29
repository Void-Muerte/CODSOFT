const { StatusCodes } = require("http-status-codes");
const {
  findAllEmployers,
  deleteEmployerByUserId,
} = require("../services/employer.service");
const { deleteUserById } = require("../services/user.service");

exports.getAllEmployers = async (req, res) => {
  try {
    const employers = await findAllEmployers();
    if (!employers?.length) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Employers list empty!" });
    }
    return res.status(StatusCodes.OK).json({ employers });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
};

exports.purgeEmployerById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await deleteUserById(id);
    if (!user)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Employer not found!" });
    const employer = await deleteEmployerByUserId(user._id);
    if (!employer)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Error encountered!" });
    return res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    if (error.name == "CastError")
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid id!" });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
};
