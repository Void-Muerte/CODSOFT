const express = require("express");
const { getAllUsers } = require("../controllers/user.controller");
const {
  getAllCandidates,
  purgeCandidateById,
} = require("../controllers/candidate.controller");
const {
  getAllEmployers,
  purgeEmployerById,
} = require("../controllers/employer.controller");
const adminRouter = express.Router();

adminRouter.get("/users", getAllUsers);
adminRouter.get("/candidates", getAllCandidates);
adminRouter.get("/employers", getAllEmployers);
adminRouter.delete("/employer/:id", purgeEmployerById);
adminRouter.delete("/candidate/:id", purgeCandidateById);

module.exports = adminRouter;
