var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    location: String,
    email: String,
    phone: String,
    role: [{type: String, enum:["ADOPTER","SHELTER"]}],
}, {collection:"user"});
module.exports = userSchema;