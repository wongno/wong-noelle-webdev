(function () {
    angular
        .module("PetAppMaker")
        .service("PetService", PetService);

    function PetService($http) {

        var api = {
            "findPetsByShelterId": findPetsByShelterId,
            "createPet": createPet,
            "findPetById": findPetById,
            "updatePet": updatePet,
            "deletePet": deletePet,
        };
        return api;

        function deletePet(userId, petId) {
            var url = "/api/user/" + userId + "/pet/" + petId;
            return $http.delete(url);
        }

        function updatePet(petId, pet) {
            var url = "/api/pet/"+ petId;
            return $http.put(url,pet);
        }

        function findPetById(petId){
            var url = "/api/pet/"+petId;
            return $http.get(url);

        }

        function createPet(userId, pet){
            var url ="/api/user/"+userId+"/pet";
            return $http.post(url,pet);
        }

        function findPetsByShelterId(shelterId) {
            var url = "/api/shelter/" + shelterId +"/pet";
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

    }
})();