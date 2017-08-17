var mongoose = require("mongoose");
var adopterSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    description: String,
    location: String,
    phone: String,
    email: String,
    pets: [{type: mongoose.Schema.Types.ObjectId, ref:"PetModel"}],
   _link: {type: mongoose.Schema.Types.ObjectId, ref:"ProjectUserModel"},
    shelters: [{type: mongoose.Schema.Types.ObjectId, ref:"ShelterModel"}],
}, {collection:"adopter"});
module.exports = adopterSchema;