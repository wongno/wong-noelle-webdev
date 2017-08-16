var app = require("../../express");
var shelterModel = require("../model/user/shelter/shelter.model.server");
var projectUserModel = require("../model/user/project-user.model.server");

app.post("/api/shelter", createShelter);
app.get("/api/shelter/:userId/user",findShelterByUserId);
app.get("/api/shelter/:shelterId",findShelterById);

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