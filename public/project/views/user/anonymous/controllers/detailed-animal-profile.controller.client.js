(function () {
    angular
        .module("PetAppMaker")
        .controller("AnimalProfileController",AnimalProfileController);
    function AnimalProfileController($routeParams, $http, AnimalSearchService, PetService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.adopterId = $routeParams.adopterId;
        model.petId = $routeParams["petId"];
        var petId = $routeParams["petId"];
       // model.findPetById = findPetById;
        model.animalShelterName = animalShelterName;


        function init() {
            // AnimalSearchService
            //     .findPetById(petId)
            //     .then(function (response) {
            //         model.animal = response.petfinder.pet;
            //
            //     });

            console.log(model.petId);
            PetService
                .findPetById(model.petId)
                .then(function (pet) {
                    model.animal = pet;
                    console.log(pet);
                });
            // AnimalSearchService
            //     .findPetById(model.petId)
            //     .then(function (response) {
            //         model.animal = response.petfinder.pet;
            //         model.name = model.animal.name.$t;
            //
            //     });

        }
        init();

        // function findPetById(petId) {
        //     AnimalSearchService
        //         .findPetById(petId)
        //         .then(function (response) {
        //        //     model.animal = response.petfinder.pet.name.$t;
        //             console.log(model.animal);
        //       //      return model.animal;
        //         });
        //
        // }

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