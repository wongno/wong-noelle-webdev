var mongoose = require("mongoose");
var petSchema = mongoose.Schema({
    name: String,
    description: String,
    breed: String,
    _shelter: {type: mongoose.Schema.Types.ObjectId, ref: "ShelterModel"},
    animal: String,
    sex: String,
    age: String,
    size: String,
    dateAdded : {type: Date, default: Date.now},
}, {collection:"pet"});
module.exports = petSchema;