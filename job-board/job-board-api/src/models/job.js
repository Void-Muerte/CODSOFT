const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    company:{type:mongoose.Schema.Types.ObjectId, ref:'employers', required:true},
    position:{type:String, required:true},
    description:{type:String, required:true},
    salary:{type:String},
    responsibilies:{type:String},
    tags:{type:Array, default:[]},
    active:{type:Boolean, default:true}
}, {timestamps:true});


module.exports = mongoose.model('jobs', jobSchema);