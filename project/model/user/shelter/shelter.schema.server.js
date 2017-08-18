var mongoose = require("mongoose");
var shelterSchema = mongoose.Schema({
    name: String,
    description: String,
    location: String,
    phone: String,
    email: String,
    apiId: String,
    _followedBy:[String],
    _adopters:[{type: mongoose.Schema.Types.ObjectId, ref:"AdopterModel"}],
    _link: {type: mongoose.Schema.Types.ObjectId, ref:"ProjectUserModel"},
    pets: [{type: mongoose.Schema.Types.ObjectId, ref:"PetModel"}],
}, {collection:"shelter"});
module.exports = shelterSchema;
