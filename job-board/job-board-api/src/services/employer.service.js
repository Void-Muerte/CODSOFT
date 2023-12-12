const { default: mongoose } = require('mongoose');
const Employer = require('../models/employer');

/**
 * Create a new Employer
 * @param {String} name 
 * @param {String} location 
 * @param {String} email 
 * @param {String} password 
 * @returns {Promise<Employer>}
 */
exports.createEmployer = async(name, location, email, password)=>{
    const newEmployer = new Employer({name, location, email, password});

    return await newEmployer.save();
}

/**
 * Find Employer by id
 * @param {mongoose.Schema.Types.ObjectId} id 
 * @returns {Promise<Employer>}
 */
exports.findEmployerById = async(id)=>await Employer.findById(id); 

/**
 * Find Employer by Email
 * @param {String} email 
 * @returns {Promise<Employer>}
 */

exports.findEmployerByEmail = async(email) => await Employer.findOne({email});
/**
 * Find All Employers
 * @returns {Promise<Employer[]>}
 */
exports.findAllEmployers = async()=>await Employer.find();

/**
 * Update employer location
 * @param {String} location 
 * @param {mongoose.Schema.Types.ObjectId} id 
 * @returns {Promise<Employer>}
 */
exports.updateEmployerLocation = async (location, id)=> await Employer.findByIdAndUpdate(id, {$set:{location:location}},{new:true});

/**
 * Update Employer's password by id
 * @param {mongoose.Schema.Types.ObjectId} id 
 * @param {String} password 
 * @returns {Promise<Employer>}
 */
exports.updateUserPassword = async (id, password)=> await Employer.findByIdAndUpdate(id, {$set:{password:password}});

/**
 * Delete Employer by id
 * @param {mongoose.Schema.Types.ObjectId} id 
 * @returns 
 */
exports.deleteEmployerById = async(id)=> await Employer.findByIdAndDelete(id);