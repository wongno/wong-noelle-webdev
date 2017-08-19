var app = require("../../express");
var petModel = require('../model/pet/pet.model.server');
var adopterModel = require('../model/user/adopter/adopter.model.server');

app.post("/api/shelter/:shelterId/pet",createPet);
app.post("/api/pet/:adopterId",addPet);
app.get("/api/adopter/:adopterId/pets",findPetsByAdopter);
app.get("/api/shelter/:shelterId/pet",findPetsByShelter);
app.get("/api/adopter/:adopter/pet/:petId",findPetByAdopterId);
app.get("/api/pet/:petId", findPetById);
app.put("/api/pet/:petId", updatePet);
app.delete ("/api/shelter/:shelterId/pet/:petId", deletePet);

function findPetsByAdopter(req,res) {
    var adopterId = req.params.adopterId;
    petModel
        .findPetsByAdopter(adopterId)
        .then(function (pets) {
            res.json(pets);
        });
}

function deletePet(req, res) {
    var petId = req.params.petId;
    var shelterId = req.params.shelter;
    petModel
        .deletePet(shelterId, petId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
        res.sendStatus(404).send(err);
    });
}

function addPet(req,res) {
    var adopterId = req.params.adopterId;
    var pet = req.body;
    var petToAdd = [];
    adopterModel
        .findById(adopterId)
        .then(function (adopter) {
            petToAdd.push(adopter._id);
            pet._adopter = petToAdd;
            petModel
                .addPet(adopterId,pet)
                .then(function (petDoc) {
                    res.json(petDoc);
                }, function (err) {
                    res.statusCode(500).send(err);
                });
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
    var petId = req.params.petId;
    petModel
        .findPetById(petId)
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

function findPetByAdopterId(req,res) {
    var adopterId = req.params.adopterId;
    var petId = req.params.petId;
    petModel
        .findPetByAdopter(adopterId,petId)
        .then(function (pets) {
            res.json(pets);
        })
}
function findPetsByShelter(req, res){
    var shelterId = req.params.shelterId;
    petModel
        .findPetsByShelter(shelterId)
        .then(function (pets) {
            res.json(pets);
        });

}