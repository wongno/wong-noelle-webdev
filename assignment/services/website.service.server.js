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
app.delete("/api/website/:websiteId", deleteWebsite);

function deleteWebsite(req,res) {
    var websiteId = req.params.website;
    for(var w in websites) {
        if(websites[w]._id === websiteId) {
            if (w > -1) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
    }
    res.sendStatus(404);
    return;
}

function updateWebsite(req,res) {
    var website = req.body;
    for (var w in websites){
        if(websites[w]._id === website._id){
            websites[w] = website;
            res.json(website);
            return;
        }
    }
    res.sendStatus(404);
}
function findWebsiteById(req,res) {
    websiteModel
        .findWebsiteById(req.params.websiteId)
        .then(function (websiteDoc) {
            res.json(websiteDoc);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
    // for (var w in websites){
    //     if (websites[w]._id === req.params.websiteId){
    //         res.json(websites[w]);
    //         return;
    //     }
    // }
    // res.send(404);
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
    // website._id = (new Date()).getTime() + "";
    // website.developerId = userId;
    // websites.push(website);
    // res.json(website);
}

function findWebsitesByUser(req, res){
    var userId = req.params.userId;
   // var sites = [];

    websiteModel.findWebsitesByUser(userId)
        .then(function (websites) {
            res.json(websites);
        })
    // for(var w in websites) {
    //     if(websites[w].developerId === userId) {
    //         sites.push(websites[w]);
    //     }
    // }
    // res.json(sites);
    // return;
}