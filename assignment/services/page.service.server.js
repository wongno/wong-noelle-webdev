var app = require("../../express");
var pageModel = require("../model/page/page.model.server");

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.post("/api/website/:websiteId/page", createPage);
app.delete("/api/website/:websiteId/page/:pageId", deletePage);

function deletePage(req,res){
    var websiteId = req.params.website;
    var pageId = req.params.pageId;
    pageModel
        .deletePage(websiteId, pageId)
        .then(function (status) {
            res.json(status);
        });
}

function createPage(req,res) {
    var websiteId = req.params.websiteId;
    var page = req.body;
    pageModel
        .createPage(websiteId, page)
        .then(function (status) {
            res.json(status);
        },function (err) {
            res.sendStatus(404).send(err);
        });
}
function updatePage(req,res) {
    var pageId = req.params.pageId;
    var page = req.body
    pageModel
        .updatePage(pageId,page)
        .then(function (status) {
            res.send(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findAllPagesForWebsite(req,res) {
    var websiteId = req.params.websiteId;
    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (pages) {
            res.json(pages);
        });
}

function findPageById(req,res) {
    var pageId = req.params.pageId;
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        });
}