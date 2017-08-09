var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
//var db = require('../models.server');
var widgetModel = mongoose.model("WidgetModel", widgetSchema);
var pageModel = require("../page/page.model.server");
widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;
module.exports = widgetModel;

// function createPage(websiteId, page){
//     page._website = websiteId;
//     var pageTmp = null;
//     return pageModel
//         .create(page)
//         .then(function (pageDoc) {
//             pageTmp = pageDoc;
//             return websiteModel.addPage(websiteId, pageDoc);
//         })
//         .then(function (websiteDoc) {
//             return pageTmp;
//         })
// }
function createWidget(pageId, widget){
    widget._page = pageId;
    var widgetTmp = null;
    return widgetModel
        .create(widget)
        .then(function (widgetDoc) {
            widgetDoc.type = widget.type;
            widgetTmp = widgetDoc;
            return pageModel.addWidget(pageId, widgetDoc);
        })
        .then(function (pageDoc) {
            widgetTmp.type = widget.type;
            return widgetTmp;
        })
}

function findAllWidgetsForPage(pageId){
    return widgetModel
        .find({_page:pageId});
}
function findWidgetById(widgetId){
    return widgetModel
        .findById(widgetId);
}
function updateWidget(widgetId, widget){
    return widgetModel.update({_id:widgetId}
        ,{$set:widget});
}

function deleteWidget(widgetId){
    return widgetModel
        .remove({_id:widgetId})
        .then(function (status) {
            return pageModel.removeWidget(pageId, widgetId);
        });
}
function reorderWidget(pageId, start, end){
    var widgetList = null;
    return widgetModel
        .find({_page:pageId})
        .then(function (widgets) {
            var widget = widgets[start];
            widgets.splice(start,1);
            widgets.splice(end,0,widget);
            widgetList=widgets;
            return pageModel.updateWidgets(pageId, widgetList);
        });
}