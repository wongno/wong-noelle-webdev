(function () {
    angular
        .module("PetAppMaker")
        .factory("PetService", PetService);

    function PetService($http) {

        var api = {
            "addPet":addPet,
            "findPetsByShelterId": findPetsByShelterId,
            "createPet": createPet,
            "findPetById": findPetById,
            "updatePet": updatePet,
            "deletePet": deletePet,
            "findPetsByAdopter":findPetsByAdopter,
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
            console.log(petId);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function addPet(adopterId,pet) {
            var url ="/api/pet/"+adopterId;
            return $http.post(url,pet);
        }

        function createPet(shelterId, pet){
            var url ="/api/shelter/"+shelterId+"/pet";
            return $http.post(url,pet);
        }

        function findPetsByAdopter(adopterId) {
            var url = "/api/adopter/"+adopterId+"/pets";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
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