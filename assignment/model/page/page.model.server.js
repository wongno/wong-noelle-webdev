var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var pageModel = mongoose.model("PageModel", pageSchema);
var websiteModel = require("../website/website.model.server");
pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
module.exports = pageModel;
function createPage(websiteId, page){
    page._website = websiteId;
    var pageTmp = null;
    return pageModel
        .create(page)
        .then(function (pageDoc) {
            pageTmp = pageDoc;
            return websiteModel.addPage(websiteId, pageDoc);
        })
        .then(function (websiteDoc) {
            return pageTmp;
        })
}
function findAllPagesForWebsite(websiteId) {
    return pageModel
        .find({_website: websiteId})
        .populate("_website", "name")
        .exec();
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}
function updatePage(pageId, page) {
    return pageModel.update({_id:pageId}
    ,{$set:page});
}
// function deleteWebsite(developerId, websiteId) {
//     return websiteModel
//         .remove({_id: websiteId})
//         .then(function (status) {
//             return userModel.removeWebsite(developerId, websiteId)
//         });
// }
function deletePage(websiteId, pageId) {
    return pageModel
        .remove({_id:pageId})
        .then(function (status) {
            return websiteModel.removeWebsite(websiteId, pageId)
        });
}
