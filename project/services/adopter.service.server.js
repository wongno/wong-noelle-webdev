var app = require("../../express");
var adopterModel = require("../model/user/adopter/adopter.model.server");
var projectUserModel = require("../model/user/project-user.model.server");

app.post("/api/adopter", createAdopter);
app.get("/api/adopter/:userId/user",findAdopterByUserId);
app.get("/api/adopter/:adopterId",findAdopterById);

function findAdopterByUserId(req,res) {
    var userId = req.params.userId;
    adopterModel
        .findAdopterByUserId(userId)
        .then(function (adopter) {
            res.json(adopter);
        });
}

function findAdopterById(req, res) {
    var adopterId = req.params.adopterId;
    adopterModel
        .findAdopterById(adopterId)
        .then(function (adopterId) {
            res.json(adopterId);
        });
}
function createAdopter(req, res) {
    var adopter = req.body;
    var userId = req.params.userId;
    projectUserModel
        .findUserById(userId)
        .then(function (user) {
            adopter._link = user._id;
        });
    adopterModel
        .createAdopter(userId,adopter)
        .then(function (adopter) {
            res.json(adopter);
        });
}