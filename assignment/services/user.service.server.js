var app = require("../../express");
var userModel = require("../model/user/user.model.server");
var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];
// http handlers
app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", findUserById);
app.get("/api/user", findUser);
app.post("/api/user", createUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);

function deleteUser(req,res) {
    userModel
        .deleteUser(req.params.userId)
        .then(function (status) {
            res.json(status);
        },function (err) {
            res.sendStatus(404).send(err);
        })
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;
    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        })
}

function findUser(req, res) {
    console.log("findUser");
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            userModel
                .findUserByCredentials(username, password)
                .then(function (user) {
                    res.json(user);
                    return;
                }, function (err) {
                    res.sendStatus(404).send(err);
                    return;
                })
            return;
        } else if(username) {
            for(var u in users) {
                if(users[u].username === username) {
                    userModel
                        .findUserByUsername(username)
                        .then(function (user) {
                            res.json(user);
                            return;
                        }, function (err) {
                            res.sendStatus(404).send(err);
                            return;
                        })
                    return;
                }
            }
        }
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
                return;})
    }

function getAllUsers(req, res) {
    res.send(users);
}

function findUserById(req, res) {
    userModel
        .findUserById(req.params.userId)
        .then(function (user) {
            res.send(user);
        });
}