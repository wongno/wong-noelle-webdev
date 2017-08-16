(function () {
    angular
        .module("PetAppMaker")
        .factory("ShelterService", ShelterService);

    function ShelterService($http) {

        var api = {
           "createShelter": createShelter,
            "findShelterByUserId":findShelterByUserId,
            "findShelterById":findShelterById,
        };

        return api;

        function createShelter(shelter) {
            var url = "/api/shelter";
            return $http.post(url,shelter);
        }
        function findShelterByUserId(userId) {
            var url = "/api/shelter/"+userId+"/user";
            return $http.get(url);
        }
        function findShelterById(shelterId) {
            var url = "/api/shelter/"+shelterId;
            return $http.get(url);

        }
    }
})();