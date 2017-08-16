var app = require("../../express");
var petModel = require('../model/pet/pet.model.server');
var projectUserModel = require("../model/user/project-user.model.server");
var shelterModel = require("../model/user/shelter/shelter.model.server");

app.post("/api/user/:userId/pet",createPet);
app.get("/api/shelter/:shelterId/pet",findPetsByShelter);
app.get("/api/pet/:petId", findPetById);
app.put("/api/pet/:petId", updatePet);
app.delete ("/api/user/:userId/pet/:petId", deletePet);

function deletePet(req, res) {
    var petId = req.params.petId;
    var developerId = req.params.userId;
    petModel
        .deletePet(developerId, petId)
        .then(function (status) {
            res.json(status);
        });
}


function updatePet(req,res) {
    var petId = req.params.petId;
    var pet = req.body;
    petModel
        .updatePet(petId,pet)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}
function findPetById(req,res) {
    petModel
        .findPetById(req.params.petId)
        .then(function (websiteDoc) {
            res.json(websiteDoc);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}
function createPet(req,res) {
    var pet = req.body;
    var userId = req.params.userId;
    petModel.createPet(userId, pet)
        .then(function (websiteDoc) {
            res.json(websiteDoc);
        }, function (err) {
            res.statusCode(500).send(err);
        });
}

function findPetsByShelter(req, res){
    var shelterId = req.params.shelterId;
    petModel
        .findPetsByShelter()
        .then(function (pets) {
            res.json(pets);
        });

}