const { StatusCodes } = require("http-status-codes");
const {
  findAllCandidates,
  deleteCandidateByUserId,
} = require("../services/candidate.service");
const { deleteUserById } = require("../services/user.service");

/** all candidates handler */
exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await findAllCandidates();
    if (!candidates?.length)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No registered candidates!" });
    return res.status(StatusCodes.OK).json({ candidates });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
};

exports.purgeCandidateById = async (req, res) => {
  try {
    const id = req.params.id; /** the id is user id not candidate id */
    const user = await deleteUserById(id);
    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found!" });
    const cand = await deleteCandidateByUserId(user._id);
    if (!cand)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Problem encountered!" });
    return res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    if (error.name === "CastError")
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid user Id" });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.msg });
  }
};
