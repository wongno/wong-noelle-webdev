(function () {
    angular
        .module("PetAppMaker")
        .service("AnimalSearchService", AnimalSearchService);
    function AnimalSearchService($http,$routeParams,$sce) {

        this.searchPets = searchPets;
        this.searchAnimalsByLocation = searchAnimalsByLocation;
        this.findPetById = findPetById;
        this.findPetsForShelter = findPetsForShelter;
        this.searchShelterByLocation = searchShelterByLocation;
        this.findShelterById = findShelterById;

        var key = "c24a4370afabf3d116da27ad2ac7e483";
        var secret = "5ad6a3f9a39a1658";
        var urlBase0 = "http://api.petfinder.com/my.method?key=12345";
        var urlBase = "http://api.petfinder.com/my.method?key=12345&arg1=foo&format=json&output=basic&count=6";
        var urlBase2 = "http://api.petfinder.com/my.method?key=12345&arg1=foo&format=json&output=basic&count=6";


        function findPetById(petId) {
            console.log("findPetById");
            console.log(petId +" findPetById");
            var url = urlBase2
                .replace("my.method", "pet.get")
                .replace("12345", key)
                .replace("arg1", "id")
                .replace("foo", petId);
            return $.getJSON($sce.trustAsResourceUrl(url+"&callback=?"),function (data) {
                return data;
            });
        }

        function findShelterById(shelterId) {
            var url = urlBase2
                .replace("my.method", "shelter.get")
                .replace("12345", key)
                .replace("arg1", "id")
                .replace("foo", shelterId);
            return $.getJSON($sce.trustAsResourceUrl(url+"&callback=?"),function (data) {
                return data;
            });
        }

        function findPetsForShelter(shelterId) {
            var url = urlBase2
                .replace("my.method", "shelter.getPets")
                .replace("12345", key)
                .replace("arg1", "id")
                .replace("foo", shelterId);
            return $.getJSON($sce.trustAsResourceUrl(url+"&callback=?"),function (data) {
                console.log(data);
                return data;
            });
        }

        function searchAnimalsByLocation(location) {
            var url = urlBase
                .replace("my.method", "pet.find")
                .replace("12345", key)
                .replace("arg1", "location")
                .replace("foo", location);
            return $.getJSON($sce.trustAsResourceUrl(url+"&callback=?"),function (data) {
                return data;
            });
        }

        function searchShelterByLocation(location) {
            var url = urlBase
                .replace("my.method", "shelter.find")
                .replace("12345", key)
                .replace("arg1", "location")
                .replace("foo", location);
            return $.getJSON($sce.trustAsResourceUrl(url+"&callback=?"),function (data) {
                return data;
            });
        }

        function searchPets(string) {
            var url = urlBase
                .replace("my.method", "pet.find")
                .replace("12345", key)
                .replace("&arg1=foo","")
                .concat(string)
                .concat("&callback=?");
            console.log(url);
            return $.getJSON($sce.trustAsResourceUrl(url),function (data) {
                return data;
            });
        }


    }



})();