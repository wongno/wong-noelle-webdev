var mongoose = require("mongoose");
var adopterSchema = require("./adopter.schema.server");
//var db = require('../models.server');
var adopterModel = mongoose.model("AdopterModel", adopterSchema);
var projectUserModel = require("../project-user.model.server");

adopterModel.findAdopterByUserId = findAdopterByUserId;
adopterModel.findAdopterById = findAdopterById;
adopterModel.createAdopter = createAdopter;
adopterModel.addPet = addPet;
adopterModel.removePet = removePet;
adopterModel.updateAdopter = updateAdopter;
module.exports = adopterModel;

function updateAdopter(adopterId,adopter) {
    console.log(adopter);
    return adopterModel.update({_id: adopterId},
        {$set: adopter});
}

function removePet(adopterId, petId) {
    return adopterModel
        .findById(adopterId)
        .then(function (adopter) {
            var index = adopter.pets.indexOf(petId);
            adopter.splice(index, 1);
            return adopter.save();
        });
}

function addPet(adopterId, pet) {
    return adopterModel
        .findById(adopterId)
        .then(function (adopter) {
            adopter.pets.push(pet);
            return adopter.save();
        });
}

function findAdopterById(adopterId) {
    return adopterModel.findById(adopterId);
}

function findAdopterByUserId(userId) {
    return adopterModel.findOne({_link:userId});
}

function createAdopter(userId,adopter) {
    return adopterModel.create(adopter);

}
