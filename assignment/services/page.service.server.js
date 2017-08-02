var app = require("../../express");

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.post("/api/website/:websiteId/page", createPage);

function createPage(req,res) {
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    page.websiteId = req.params.websiteId;
    pages.push(page);
    res.json(page);
    return;
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
    var listPages = [];
    for(var p in pages) {
        if(pages[p].websiteId === req.params.websiteId) {
            listPages.push(pages[p]);
        }
    }
    res.json(listPages);
    return;
}

function findPageById(req,res) {
    for (var p in pages){
        if (pages[p]._id === req.params.pageId){
            res.json(pages[p]);
            return;
        }
    }
    res.send(404);
}