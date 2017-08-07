var app = require("../../express");
var userModel = require('../model/user/user.model.server');

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];
// http handlers
app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", findUserById);
app.get("/api/user", findUserByUsername);
app.get("/api/user", findUserByCredentials);
app.post("/api/user", createUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);

function deleteUser(req,res) {
    console.log("fiddle");
    for(var u in users) {
        if(users[u]._id === req.params.userId) {
            if (u > -1) {
                console.log("splice");
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
    }
    res.sendStatus(404);
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;
console.log("updated");
    for(var u in users) {
        if(users[u]._id === userId) {
            users[u] = user;
            res.send(user)
            return;
        }
    }
res.sendStatus(404);
}

function findUserByUsername(req,res) {
    console.log(users);
    var username = req.query.username;
    console.log(username + "");
        for(var u in users) {
            if(users[u].username === username) {
                console.log("ok");
                res.send(users[u]);
                return;
            }
    }
    console.log("denied");
    res.send("0");
}

function createUser(req, res) {
    console.log("reach");
    var user = req.body;
    // user._id = (new Date()).getTime() + "";
    // users.push(user);
    // res.send(user);
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        })
}

function findUserByCredentials(req, res) {
    var username = req.query.username;
    var password = req.query.password;

        for(var u in users) {
            var _user = users[u];
            if(_user.username === username && _user.password === password) {
                res.send(_user);
                return;
            }
        }
    res.send("0");

}

function getAllUsers(req, response) {
    response.send(users);
}

function findUserById(req, response) {
    for(var u in users) {
        if(users[u]._id === req.params.userId) {
            response.send(users[u]);
        }
    }
}