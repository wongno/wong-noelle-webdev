var mongoose = require("mongoose");
var shelterSchema = mongoose.Schema({
    username: String,
    password: String,
    role: String,
    shelterName: String,
    email: String,
    phone: String,
    pets: [{type: mongoose.Schema.Types.ObjectId, ref:"PetModel"}],
    dateCreated: {type: Date, default: Date.now},
}, {collection:"user"});
module.exports = shelterSchema;