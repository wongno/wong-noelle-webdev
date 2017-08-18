(function () {
    angular
        .module("PetAppMaker")
        .factory("ShelterService", ShelterService);

    function ShelterService($http) {

        var api = {
            "addShelter": addShelter,
           "createShelter": createShelter,
            "findShelterByUserId":findShelterByUserId,
            "findShelterById":findShelterById,
            "updateShelter": updateShelter,
        };

        return api;

        function updateShelter(shelterId, shelter) {
            var url="/api/shelter/"+shelterId;
            return $http.put(url,shelter);
        }

        //need to add to model
        function addShelter(adopterId,shelter) {
            var url ="/api/shelter/"+adopterId;
            return $http.post(url,shelter);
        }

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
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }
    }
})();