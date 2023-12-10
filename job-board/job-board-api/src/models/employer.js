const mongoose = require('mongoose');

const employerSchema  = new mongoose.Schema({
    name:{type:String, required:true},
    location:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    website:{type:String},
    role:{type:String, default:'EMP'}
},{timestamps:true});


module.exports = model('employers', employerSchema);