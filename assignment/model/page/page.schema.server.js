var mongoose = require("mongoose");
var pageSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"}],
    dateCreated: {type: Date, default: Date.now},
}, {collection:"user"});
module.exports = pageSchema;