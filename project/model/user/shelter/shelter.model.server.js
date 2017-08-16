var mongoose = require("mongoose");
var shelterSchema = require("./shelter.schema.server");
var userModel = require("../project-user.model.server");
//var db = require('../models.server');
var shelterModel = mongoose.model("ShelterModel", shelterSchema);

shelterModel.createShelter = createShelter;
module.exports = shelterModel;

function createShelter(shelter) {
    return shelterModel.create(shelter);
}