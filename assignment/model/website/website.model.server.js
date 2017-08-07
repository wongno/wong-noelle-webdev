var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
var userModel = require('../user/user.model.server');

websiteModel.createWebsite = createWebsite;
websiteModel.findWebsitesByUser = findWebsiteByUser;
module.exports = websiteModel;
module.exports = userModel;

function createWebsite(developerId, website){
    website.developer = developerId;
    var websiteTmp = null''
    return websiteModel
        .create(website)
        .then(function (websiteDoc) {
            websiteTmp = websiteDoc;
            return userModel.addWebsite(developerId, websiteDoc);
        })
        .then(function (userDoc) {
            return websiteTmp;
        })
}

function findWebsiteByUser(developerId) {
    return websiteModel.find({developer:developerId});
}