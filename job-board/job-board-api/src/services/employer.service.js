const { default: mongoose } = require("mongoose");
const Employer = require("../models/employer");

/**
 * Create a new Employer
 * @param {String} name
 * @param {String} location
 * @param {mongoose.Schema.Types.ObjectId} user
 * @param {String} website
 * @returns {Promise<Employer>}
 */
exports.createEmployer = async (name, location, user, website) => {
  const newEmployer = new Employer({ name, location, user, website });
  return await newEmployer.save();
};

/**
 * Find Employer by id
 * @param {mongoose.Schema.Types.ObjectId} id
 * @returns {Promise<Employer>}
 */
exports.findEmployerById = async (id) => await Employer.findById(id);

/**
 * Find All Employers
 * @returns {Promise<Employer[]>}
 */
exports.findAllEmployers = async () => await Employer.find({});

/**
 * Update employer location
 * @param {String} location
 * @param {mongoose.Schema.Types.ObjectId} id
 * @returns {Promise<Employer>}
 */
exports.updateEmployerLocation = async (location, id) =>
  await Employer.findByIdAndUpdate(
    id,
    { $set: { location: location } },
    { new: true }
  );

/**
 * Delete Employer by id
 * @param {mongoose.Schema.Types.ObjectId} id
 * @returns
 */
exports.deleteEmployerById = async (id) => await Employer.findByIdAndDelete(id);

/**
 * Delete Employer by user Id
 * @param {mongoose.Schema.Types.ObjectId} user
 * @returns {Promise<Employer>}
 */
exports.deleteEmployerByUserId = async (user) =>
  await Employer.findOneAndDelete({ user });
