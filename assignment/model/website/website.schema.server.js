var mongoose = require('mongoose');
var websiteSchema = mongoose.Schema({
    //
    // _user
    // Reference to User
    // Refers to parent user
    // name
    // String
    //
    //
    // description
    // String
    //
    //
    // pages
    //     [Page]
    // Array of references to child page instances
    // dateCreated
    // Date
    // Current date
    _user: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
    name: String,
    description: String,
    pages: [{type: mongoose.Schema.Types.ObjectId, ref:"PagesModel"}],
    //role : {type: String, enum:["ADMIN", "STUDENT"]};
    created: {type: Date, default: Date.now}
}, {collection:"website"});
module.exports = websiteSchema;