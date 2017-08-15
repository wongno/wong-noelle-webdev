var mongoose = require("mongoose");
var adopterSchema = mongoose.Schema({
    username: String,
    password: String,
    role: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    shelters: [{type: mongoose.Schema.Types.ObjectId, ref:"ShelterModel"}],
    dateCreated: {type: Date, default: Date.now},
}, {collection:"user"});
module.exports = adopterSchema;