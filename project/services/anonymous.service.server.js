var app = require("../../express");

app.get("http://api.petfinder.com/pet.find?key=c24a4370afabf3d116da27ad2ac7e483&location=", findAnimalsByLocation);

function findAnimalsByLocation(req,res) {
    var location = req.query.location;
    res.json(re);
}