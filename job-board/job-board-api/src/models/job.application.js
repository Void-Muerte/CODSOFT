const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    company:{type:mongoose.Schema.Types.ObjectId, ref:'employers'},
    job:{type:mongoose.Schema.Types.ObjectId, ref:'jobs'},
    applicants:{type:[mongoose.Schema.Types.ObjectId] , default:[]}
},{timestamps:true});

module.exports = mongoose.model('applications', applicationSchema);