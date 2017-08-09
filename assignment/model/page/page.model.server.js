var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
//var db = require('../models.server');
var pageModel = mongoose.model("PageModel", pageSchema);
pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
module.exports(pageModel);
function createPage(websiteId, page){}
function findAllPagesForWebsite(websiteId) {}
function findPageById(pageId) {}
function updatePage(pageId, page) {}
function deletePage(pageId) {}
