const { default: mongoose } = require("mongoose");
const Candidate = require("../models/candidate");

/**
 * Create new Candidate
 * @param {String} fullname
 * @param {mongoose.Schema.Types.ObjectId} user
 * @returns {Promise<Candidate>}
 */
exports.createCandidate = async (fullname, user) => {
  const cand = new Candidate({ fullname, user });
  return await cand.save();
};

/**
 * find candidate by user id
 * @param {mongoose.Schema.Types.ObjectId} user
 * @returns {Promise<Candidate>}
 */
exports.findCandidateByUserId = async (user) =>
  await Candidate.findOne({ user });

/**
 * Return all the candidates
 * @returns {Promise<Candidate[]>}
 */
exports.findAllCandidates = async () =>
  await Candidate.find({}).populate("user", "email role");

/**
 * update and Return candidate
 * @param {String} fullname
 * @param {mongoose.Schema.Types.ObjectId} id
 * @returns {Promise<Candidate>}
 */
exports.updateFullName = async (fullname, id) =>
  await Candidate.findByIdAndUpdate(id, { $set: { fullname } }, { new: true });

/**
 * Delete candidate by id
 * @param {mongoose.Schema.Types.ObjectId} id
 * @returns {Promise<Candidate>}
 */
exports.deleteCandidateById = async (id) =>
  await Candidate.findByIdAndDelete(id);

/**
 * Find and Delete a candidate by user id
 * @param {mongoose.Schema.Types.ObjectId} user
 * @returns {Promise<Candidate>}
 */
exports.deleteCandidateByUserId = async (user) =>
  await Candidate.findOneAndDelete({ user });
