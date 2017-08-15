var mongoose = require("mongoose");
var shelterSchema = mongoose.Schema({
    _link: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
    pets: [{type: mongoose.Schema.Types.ObjectId, ref:"PetModel"}],
}, {collection:"shelter"});
module.exports = shelterSchema;