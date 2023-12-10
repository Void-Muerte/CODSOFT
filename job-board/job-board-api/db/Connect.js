const mongoose = require('mongoose');

const Connect = async (URL)=>await mongoose.connect(URL);

module.exports = Connect;