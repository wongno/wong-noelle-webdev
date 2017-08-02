var app = require("../../express");
var widgets= [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/widget/:widgetId", findWidgetById);
app.post("/api/page/:pageId/widget", createWidget);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);

function deleteWidget(req,res) {
    var widgetId = req.params.widgetId;
    for(var w in widgets){
        if(widgets[w]._id === widgetId){
            if (w > -1) {
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
    }
    res.sendStatus(404);
    return;
}

function updateWidget(req,res){
    var widgetId = req.params.widgetId;
    var widget = req.body;
    for(var w in widgets){
        if(widgets[w]._id === widgetId){
            widgets[w] = widget;
            res.json(widget);
            return;
        }
    }
    res.sendStatus(404);
}

function createWidget(req,res) {
    console.log("woo!");
    var pageId = req.params.pageId;
    var widget = req.body;
    widget._id = (new Date()).getTime() + "";
    widget.pageId = pageId;
    widgets.push(widget);
    console.log(widget._id + "");
    res.send(widget);
    return;
}

function findWidgetById(req,res) {
    console.log(widgets);
    var widgetId = req.params.widgetId;
    for(var w in widgets){
        if(widgets[w]._id === widgetId){
            console.log("found widget");
            res.json(widgets[w]);
            return;
        }
    }
    res.sendStatus(404);
}

function findAllWidgetsForPage(req,res) {
    console.log(widgets);
    var listWidgets = [];
    for(var w in widgets){
        if(widgets[w].pageId === req.params.pageId){
            if(widgets[w].widgetType != null){
                listWidgets.push(widgets[w]);
            }
        }
    }
    res.json(listWidgets);
    return;
}