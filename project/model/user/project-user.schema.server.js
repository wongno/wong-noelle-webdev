var mongoose = require("mongoose");
var projectUserSchema = mongoose.Schema({
    username: String,
    password: String,
    google:{
        id: String,
        token: String
    },
    following:[{type: mongoose.Schema.Types.ObjectId, ref:"ProjectUserModel"}],
    followedBy:[{type: mongoose.Schema.Types.ObjectId, ref:"ProjectUserModel"}],
    role: [{type: String, enum:["adopter","shelter", "admin"]}],
}, {collection:"user"});
module.exports = projectUserSchema;

var UserSchema = mongoose.Schema({
    facebook: {
        id:    String,
        token: String
    }
});
