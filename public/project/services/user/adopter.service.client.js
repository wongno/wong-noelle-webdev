(function () {
    angular
        .module("PetAppMaker")
        .factory("AdopterService", AdopterService);

    function AdopterService($http) {

        var api = {
            "createAdopter": createAdopter,
            "findAdopterByUserId":findAdopterByUserId,
            "findAdopterById":findAdopterById,
            "updateAdopter": updateAdopter,
        };

        return api;

        function updateAdopter(adopterId, adopter) {
            var url = "/api/adopter/"+adopterId;
            return $http.put(url,adopter);
        }

        function createAdopter(adopter) {
            var url = "/api/adopter";
            return $http.post(url,adopter);
        }
        function findAdopterByUserId(userId) {
            var url = "/api/adopter/"+userId+"/user";
            return $http.get(url);
        }
        function findAdopterById(adopterId) {
            var url = "/api/adopter/"+adopterId;
            return $http.get(url);

        }
    }
})();