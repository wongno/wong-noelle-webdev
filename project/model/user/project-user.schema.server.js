var mongoose = require("mongoose");
var projectUserSchema = mongoose.Schema({
    username: String,
    password: String,
    role: [{type: String, enum:["adopter","shelter", "admin"]}],
}, {collection:"user"});
module.exports = projectUserSchema;