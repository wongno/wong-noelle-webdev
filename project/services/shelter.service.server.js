var app = require("../../express");
var shelterModel = require("../model/user/shelter/shelter.model.server");
var projectUserModel = require("../model/user/project-user.model.server");
var adopterModel = require('../model/user/adopter/adopter.model.server');


app.post("/api/shelter/:adopterId", addShelter);
app.post("/api/shelter", createShelter);
app.get("/api/shelter/:userId/user",findShelterByUserId);
app.get("/api/shelter/:shelterId",findShelterById);
app.put("/api/shelter/:shelterId",updateShelter);
app.get("/api/adopter/:adopterId/shelters",findSheltersByAdopter);

function findSheltersByAdopter(req,res) {
    var adopterId = req.params.adopterId;
    shelterModel
        .findSheltersByAdopter(adopterId)
        .then(function (shelters) {
            res.json(shelters);
        });
}

function updateShelter(req,res) {
    var shelterId = req.params.shelterId;
    var shelter = req.body;
    shelterModel
        .updateShelter(shelterId, shelter)
        .then(function (status) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404).send(err);
        });
}

function addShelter(req,res) {
    var adopterId = req.params.adopterId;
    var shelter = req.body;
    var shelterToAdd = [];
    adopterModel
        .findById(adopterId)
        .then(function (adopter) {
            shelterToAdd.push(adopter._id);
            shelter._adopters = shelterToAdd;
            shelterModel
                .addShelter(adopterId,shelter)
                .then(function (petDoc) {
                    res.json(petDoc);
                }, function (err) {
                    res.statusCode(500).send(err);
                });
        });
}

function findShelterByUserId(req,res) {
    var userId = req.params.userId;
    shelterModel
        .findShelterByUserId(userId)
        .then(function (shelter) {
            res.json(shelter);
        });
}

function findShelterById(req, res) {
    var shelterId = req.params.shelterId;
    shelterModel
        .findShelterById(shelterId)
        .then(function (shelter) {
            res.json(shelter);
        });
}

function createShelter(req, res) {
    console.log('here');
    var shelter = req.body;
    var userId = req.params.userId;
    projectUserModel
        .findUserById(userId)
        .then(function (user) {
            shelter._link = user._id;
        });
    shelterModel
        .createShelter(userId,shelter)
        .then(function (shelter) {
            res.json(shelter);
        });
}