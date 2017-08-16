var mongoose = require("mongoose");
var adopterSchema = mongoose.Schema({
   _link: {type: mongoose.Schema.Types.ObjectId, ref:"ProjectUserModel"},
    shelters: [{type: mongoose.Schema.Types.ObjectId, ref:"ShelterModel"}],
}, {collection:"adopter"});
module.exports = adopterSchema;