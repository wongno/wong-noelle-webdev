var app = require("../../express");
var widgetModel = require("../model/widget/widget.model.server");
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: './public/uploads' });
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
app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.put("/api/page/:pageId/widget", sortWidget);

function sortWidget(req,res) {



   //$http.put("/page/:pageId/widget?index="+index1+"&final="+index2);
    var initial = req.query.index1;
    var num = parseInt(initial);
    console.log(num);
    var final = req.query.index2;
    var widget = widgets[initial];
    console.log(initial + 0);
    widgets.splice(initial,1);
    console.log(widgets);
    console.log("in between");
    widgets.splice(final,0,widget);
    console.log(widgets);
    res.json(widgets);
    return;
}

function uploadImage(req, res) {
console.log("uploadImage");
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;
    console.log('/uploads/'+filename);
    var widget = req.body;
    widget.url = '/uploads/'+filename;
    for(var w in widgets){
        if(widgets[w]._id === widget._id){
            widgets[w] = widget;
            res.json(widget);
            return;
        }
    }
    var callbackUrl = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";

    res.redirect(callbackUrl);
}

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
    // console.log("woo!");
    var pageId = req.params.pageId;
    var widget = req.body;
    widgetModel
        .createWidget(req.params.pageId, req.body)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        })
    // widget._id = (new Date()).getTime() + "";
    // widget.pageId = pageId;
    // widgets.push(widget);
    // console.log(widget._id + "");
    // res.send(widget);
    // return;
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
    widgetModel
        .findAllWidgetsForPage(req.params.pageId)
        .then(function (widgets) {
            res.json(widgets);
        });
    // var listWidgets = [];
    // for(var w in widgets){
    //     if(widgets[w].pageId === req.params.pageId){
    //         if(widgets[w].widgetType != null){
    //             listWidgets.push(widgets[w]);
    //         }
    //     }
    // }
    // res.json(listWidgets);
    // return;
}