var mongoose = require("mongoose");
var petSchema = mongoose.Schema({
    name: String,
    description: String,
    breed: String,
    animal: String,
    sex: String,
    age: String,
    size: String,
    _shelter: {type: mongoose.Schema.Types.ObjectId, ref: "ShelterModel"},
}, {collection:"pet"});
module.exports = petSchema;