const bcrypt = require("bcrypt");
const { Request, Response } = require("express");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const {
  findUserByEmail,
  createNewUser,
  findUserById,
} = require("../services/user.service");
const {
  createEmployer,
  findEmployerByEmail,
  findEmployerById,
} = require("../services/employer.service");
const { getTokens, secretKeys } = require("../utils/tokens");
const { cookieOptions } = require("../../config/cookieOptions");
const { createCandidate } = require("../services/candidate.service");

/** Register candidate */
exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // first create a new user
    const user = await createNewUser(email, hashedPassword);
    if (!user)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Problem encountered!" });
    // then create a new candidate
    const candidate = await createCandidate(fullname, user._id);
    if (!candidate)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Problem encountered!" });
    return res.status(StatusCodes.CREATED).json({ created: true });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
};

/** Register Employer */
exports.registerEmployer = async (req, res) => {
  try {
    const { name, email, location, password, website } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createNewUser(email, hashedPassword, "EMP");
    if (!user)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Problem encountered!" });
    const employer = await createEmployer(name, location, user._id, website);
    if (!employer)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Problem encountered!" });
    return res.status(StatusCodes.CREATED).json({ created: true });
  } catch (error) {
    if (error.code === 11000)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Account with same email aleady exist!" });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
};

/** Login User */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Email or password incorrect!" });
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Email or password incorrect!" });
    const { accessToken, refreshToken } = getTokens(user);
    res.cookie("jpc", refreshToken, cookieOptions);
    return res.status(StatusCodes.OK).json({ loggedIn: true, accessToken });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
};

exports.refreshAcessToken = async (req, res) => {
  try {
    const jpc = req.cookies.jpc;
    const { refreshKey } = secretKeys();
    const userToken = jwt.verify(jpc, refreshKey);
    if (!userToken)
      return res.status(StatusCodes.FORBIDDEN).json({ msg: "invalid token" });
    const user = await findUserById(userToken.id);
    if (!user)
      return res.status(StatusCodes.FORBIDDEN).json({ msg: "User not found!" });
    const { accessToken } = getTokens(user);
    return res.status(StatusCodes.OK).json({ accessToken, refreshed: true });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
};

exports.logout = (req, res) => {
  const { jpc } = req.cookies;
  if (!jpc)
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Bad request!" });
  const { httpOnly, secure, sameSite } = cookieOptions;
  res.clearCookie("jpc", { httpOnly, sameSite, secure });
  res.status(StatusCodes.OK).json({ isLoggedOut: true });
};
