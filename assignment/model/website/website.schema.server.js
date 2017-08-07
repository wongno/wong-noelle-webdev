var mongoose = require('mongoose');
var websiteSchema = mongoose.Schema({
    name: String,
    description: String,
    //role : {type: String, enum:["ADMIN", "STUDENT"]};
    developer: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
    created: {type: Date, default: Date.now}
}, {collection:"website"});
module.exports = websiteSchema;