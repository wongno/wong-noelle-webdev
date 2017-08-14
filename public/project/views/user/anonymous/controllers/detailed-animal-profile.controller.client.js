(function () {
    angular
        .module("PetAppMaker")
        .controller("AnimalProfileController",AnimalProfileController);
    function AnimalProfileController($routeParams, $http,AnimalSearchService) {
        var model = this;
        model.petId = $routeParams.petId;
        model.findPetById = findPetById;
        model.animalShelterName = animalShelterName;


        function init() {
            //model.animal = model.findPetById(model.petId);
            AnimalSearchService
                .findPetById(model.petId)
                .then(function (response) {
                    model.animal = response.petfinder.pet;
                    console.log(model.animal);
                });

        }
        init();
        console.log(model.findPetById(model.petId));

        function findPetById(petId) {
            AnimalSearchService
                .findPetById(petId)
                .then(function (response) {
                    model.animal = response.petfinder.pet;
                    return model.animal;
                });

        }

        function animalShelterName(shelterId){

        }

        function animalBreeds(petId) {
            var breeds = "";
            for(breed in model.animal.breeds){
                if(breeds === ""){
                    breeds + breed;
                } else {
                    breeds +", " + breed;
                }
            }
            return breeds;
        }


    }
})();