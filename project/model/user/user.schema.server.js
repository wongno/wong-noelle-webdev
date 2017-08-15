var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    location: String,
    email: String,
    phone: String,
    role:  [{type: String, enum:["ADMIN", "ADOPTER", "SHELTER"]}],
    dateCreated: {type: Date, default: Date.now},
}, {collection:"user"});
module.exports = userSchema;