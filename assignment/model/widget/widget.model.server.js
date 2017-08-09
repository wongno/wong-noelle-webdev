var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
//var db = require('../models.server');
var widgetModel = mongoose.model("WidgetModel", widgetSchema);