var mongoose = require("mongoose");
var petSchema = mongoose.Schema({
    name: String,
    apiId: String,
    description: String,
    breed: [String],
    photos:[String],
    shelterId:String,
    _liked:[{type: mongoose.Schema.Types.ObjectId, ref: "AdopterModel"}],
    _adopter:[{type: mongoose.Schema.Types.ObjectId, ref: "AdopterModel"}],
    _shelter: {type: mongoose.Schema.Types.ObjectId, ref: "ShelterModel"},
    animal: String,
    sex: String,
    age: String,
    size: String,
    dateAdded : {type: Date, default: Date.now},
}, {collection:"pet"});
module.exports = petSchema;