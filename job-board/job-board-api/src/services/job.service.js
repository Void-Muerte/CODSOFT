const { default: mongoose } = require('mongoose');
const Job = require('../models/job');

/**
 * Creating a new Job Listing
 * @param {String} company 
 * @param {String} position 
 * @param {Array} tags 
 * @param {String} description 
 * @param {String} responsibilities 
 * @param {String} salary 
 * @returns {Promise<Job>}
 */
exports.createNewJobListing = async(company, position, tags, description, responsibilities, salary)=>{
    const newJob = new Job({company, position, tags, description, responsibilities, salary});

    return await newJob.save()
}

/**
 * Find Job Listing by Id
 * @param {mongoose.Schema.Types.ObjectId} id 
 * @returns {Promise<Job>}
 */
exports.findJobListingById = async(id)=> await Job.findById(id);

/**
 * Returns Job Listing a given company
 * @param {mongoose.Schema.Types.ObjectId} company 
 * @returns {Promise<Job[]>}
 */
exports.findCompanyJobListings = async(company)=> await Job.find({company});
/**
 * Cancel a Job Listing by Id
 * @param {mongoose.Schema.Types.ObjectId} id 
 * @returns {Promise<Job>}
 */
exports.cancelJobListing = async(id)=> await Job.findByIdAndUpdate(id, {$set:{active:false}}, {new:true});

/**
 * Delete Job Listing by Id
 * @param {mongoose.Schema.Types.ObjectId} id 
 * @returns {Promise<Job>}
 */
exports.deleteJobListing = async(id) => await Job.findByIdAndDelete(id);