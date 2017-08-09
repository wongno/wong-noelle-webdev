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
app.delete("/api/page/:pageId", deletePage);

function deletePage(req,res){
    var pageId = req.params.pageId;
    for(var p in pages) {
        if(pages[p]._id === pageId) {
            if (p > -1) {
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
    }
   res.sendStatus(404);
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
    var page = req.body
    for (var p in pages){
        if(pages[p]._id === page._id){
            pages[p] = page;
            res.json(page);
            return;
        }
    }
    res.sendStatus(404);
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
    for (var p in pages){
        if (pages[p]._id === pageId){
            res.json(pages[p]);
            return;
        }
    }
    res.sendStatus(404);
}