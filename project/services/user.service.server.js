var app = require("../../express");
var bcrypt = require("bcrypt-nodejs");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// var googleConfig = {
//     clientID     : process.env.GOOGLE_CLIENT_ID,
//     clientSecret : process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL  : process.env.GOOGLE_CALLBACK_URL
// };

//passport.use(new GoogleStrategy(googleConfig, googleStrategy));

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var userModel = require("../model/user/project-user.model.server");

// http handlers
app.get('/api/user/all', getAllUsers);
app.get("/api/user/:userId", findUserById);
app.get("/api/user", findUser);
app.post("/api/user", createUser);
app.get('/api/user', findUserByUsername);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);
app.post("/api/login", passport.authenticate('local'), login);
app.get   ('/api/loggedin',       loggedin);
app.post  ('/api/logout',         logout);
app.post  ('/api/register',       register);
app.get ("/api/checkLogin", checkLogin);
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/#/user',
        failureRedirect: '/#/login'
    }));

function getAllUsers(req,res) {
    userModel
        .getAllUsers
        .then(function (users) {
            req.json(users);
        }, function(err) {
            res.status(404).send(err);
        });

}

function checkLogin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(
            function(user) {
                if(user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function register (req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function(user){
            if(user){
                req.login(user, function(err) {
                    if(err) {
                        res.status(400).send(err);
                    } else {
                        res.json(user);
                    }
                });
            }
        }
    );
}

function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function serializeUser(user, done) {
    done(null, user);
}


function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function login(req, res) {
    res.json(req.user);
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function deleteUser(req,res) {
    userModel
        .deleteUser( req.params.userId)
        .then(function(status) {
            res.json(200);
        }, function(err) {
                res.status(404).send(err);
        });
}


function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;
    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function createUser(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(function(user) {
            res.json(user);
        }, function(err) {
            res.status(404).send(err);
        });
}

function findUserByUsername(req,res) {
    var usernmae = req.query.username;
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
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
            });
        return;
    }
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            res.json(user);
           }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findUserById(req, res) {
    userModel
        .findUserById(req.params.userId)
        .then(function (user) {
            res.send(user);
        });
}
function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}