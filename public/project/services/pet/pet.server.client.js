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

        function deletePet(shelterId, petId) {
            var url = "/api/shelter/" + shelterId + "/pet/" + petId;
            return $http.delete(url);
        }

        function updatePet(petId, pet) {
            var url = "/api/pet/"+ petId;
            return $http.put(url,pet);
        }

        function findPetById(petId){
            var url = "/api/pet/"+petId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function createPet(shelterId, pet){
            var url ="/api/shelter/"+shelterId+"/pet";
            return $http.post(url,pet);
        }

        function findPetsByShelterId(shelterId) {
            var url ="/api/shelter/"+shelterId+"/pet";
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

    }
})();