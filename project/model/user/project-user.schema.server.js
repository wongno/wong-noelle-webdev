var mongoose = require("mongoose");
var projectUserSchema = mongoose.Schema({
    username: String,
    password: String,
    location: String,
    email: String,
    phone: String,
    // details: [{type: mongoose.Schema.Types.ObjectId,
    //     enum:[{type: mongoose.Schema.Types.ObjectId, ref:"AdopterModel"},
    //         {type: mongoose.Schema.Types.ObjectId, ref:"ShelterModel"}]}],
    role: [{type: String, enum:["adopter","shelter", "admin"]}],
}, {collection:"user"});
module.exports = projectUserSchema;