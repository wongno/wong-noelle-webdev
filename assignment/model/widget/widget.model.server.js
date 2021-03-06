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
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var w = page.widgets[start];
            page.widgets.splice(start, 1);
            page.widgets.splice(end, 0, w);
            return pageModel.update({_id: pageId},
                {$set: page});
        });
}