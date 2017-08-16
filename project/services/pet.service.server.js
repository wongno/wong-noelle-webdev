var app = require("../../express");
var petModel = require('../model/pet/pet.model.server');

app.post("/api/shelter/:shelterId/pet",createPet);
app.get("/api/shelter/:shelterId/pet",findPetsByShelter);
app.get("/api/pet/:petId", findPetById);
app.put("/api/pet/:petId", updatePet);
app.delete ("/api/shelter/:shelterId/pet/:petId", deletePet);

function deletePet(req, res) {
    var petId = req.params.petId;
    var shelterId = req.params.shelter;
    petModel
        .deletePet(shelterId, petId)
        .then(function (status) {
            res.json(status);
        }, function (err) {
        res.sendStatus(404).send(err);
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
        .then(function (pet) {
            res.json(pet);
        });
}

function createPet(req,res) {
    var pet = req.body;
    var shelterId = req.params.shelterId;
    petModel.createPet(shelterId, pet)
        .then(function (petDoc) {
            res.json(petDoc);
        }, function (err) {
            res.statusCode(500).send(err);
        });
}

function findPetsByShelter(req, res){
    var shelterId = req.params.shelterId;
    petModel
        .findPetsByShelter(shelterId)
        .then(function (pets) {
            res.json(pets);
        });

}