var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
//var db = require('../models.server');
var pageModel = mongoose.model("PageModel", pageSchema);