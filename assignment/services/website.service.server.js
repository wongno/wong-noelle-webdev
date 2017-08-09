var app = require("../../express");
var websiteModel = require('../model/website/website.model.server');
var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.post("/api/user/:userId/website",createWebsite);
app.get("/api/user/:userId/website",findWebsitesByUser);
app.get("/api/website/:websiteId", findWebsiteById);
app.put("/api/website/:websiteId", updateWebsite);
app.delete ("/api/user/:userId/website/:websiteId", deleteWebsite);

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var developerId = req.params.userId;
    websiteModel
        .deleteWebsite(developerId, websiteId)
        .then(function (status) {
            res.json(status);
        });
}


function updateWebsite(req,res) {
    var websiteId = req.params.websiteId;
    var website = req.body;
    websiteModel
        .updateWebsite(websiteId,website)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}
function findWebsiteById(req,res) {
    websiteModel
        .findWebsiteById(req.params.websiteId)
        .then(function (websiteDoc) {
            res.json(websiteDoc);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}
function createWebsite(req,res) {
    var website = req.body;
    var userId = req.params.userId;
    websiteModel.createWebsite(userId, website)
        .then(function (websiteDoc) {
            res.json(websiteDoc);
        }, function (err) {
            res.statusCode(500).send(err);
        });
}

function findWebsitesByUser(req, res){
    var userId = req.params.userId;
    websiteModel.findWebsitesByUser(userId)
        .then(function (websites) {
            res.json(websites);
        });
}