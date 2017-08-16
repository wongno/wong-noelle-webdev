var app = require("../../express");

app.get("http://api.petfinder.com/pet.find", findAnimalsByLocation);

function findAnimalsByLocation(req,res) {
    res.setHeader('Content-type', 'application/javascript');

    res.send(200, req.query.callback + "(" + JSON.stringify());
}