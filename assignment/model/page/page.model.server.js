var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
//var db = require('../models.server');
var pageModel = mongoose.model("PageModel", pageSchema);
var websiteModel = require("../website/website.model.server");
pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
module.exports = pageModel;
function createPage(websiteId, page){
    pageModel._website = websiteId;
    var pageTmp = null;
    return pageModel
        .create(page)
        .then(function (pageDoc) {
            pageTmp = pageDoc;
            return websiteModel.addPage(websiteId, pageDoc)
        })
        .then(function (websiteDoc) {
            return pageTmp;
        })
}
function findAllPagesForWebsite(websiteId) {}
function findPageById(pageId) {}
function updatePage(pageId, page) {}
function deletePage(pageId) {}