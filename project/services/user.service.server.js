var app = require("../../express");
var userModel = require("../model/user/user.model.server");
var shelterModel
// http handlers
app.get("/api/user/:userId", findUserById);
app.get("/api/user", findUser);
app.post("/api/adopter", createAdopter);
app.post("/api/shelter", createShelter);
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

function createAdopter(req, res) {
    var user = req.body;
    userModel
        .createAdopter(user)
        .then(function (user) {
            res.json(user);
        })
}

function createShelter(req, res) {
    var user = req.body;
    userModel
        .createShelter(user)
        .then(function (user) {
            res.json(user);
        })
}

function findUser(req, res) {
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
            });
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
                    });
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

function findUserById(req, res) {
    userModel
        .findUserById(req.params.userId)
        .then(function (user) {
            res.send(user);
        });
}