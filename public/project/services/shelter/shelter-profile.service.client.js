(function () {
    angular
        .module("PetAppMaker")
        .factory("ShelterProfileService", ShelterProfileService);
    function ShelterProfileService($http,$routeParams,$sce) {


        var key = "c24a4370afabf3d116da27ad2ac7e483";
        var secret = "5ad6a3f9a39a1658";
        var urlBase = "http://api.petfinder.com/my.method?key=12345&arg1=foo&arg2=foo2&format=json&output=basic";

        function findPetById(petId) {
            var url = urlBase
                .replace("my.method", "pet.get")
                .replace("12345", key)
                .replace("arg1", "id")
                .replace("foo", petId);
            return $.getJSON($sce.trustAsResourceUrl(url+"&callback=?"),function (data) {
                return data;
            });
        }
        shelter.getPets
        function searchAnimalsByLocation(location) {
            var url = urlBase
                .replace("my.method", "pet.find")
                .replace("12345", key)
                .replace("arg1", "animal")
                .replace("foo", "dog")
                .replace("arg2", "location")
                .replace("foo2", location);
            return $.getJSON($sce.trustAsResourceUrl(url+"&callback=?"),function (data) {
                return data;
            });
        }

        function searchPets() {
            var url = urlBase
                .replace("my.method", "pet.getRandom")
                .replace("12345", key)
                .replace("arg1", "animal")
                .replace("foo", model.animal)
                .replace("arg2", "output")
                .replace("foo2", "basic");
            return $http.get(url);
        }


    }



})();