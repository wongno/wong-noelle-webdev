(function () {
    angular
        .module("PetAppMaker")
        .controller("AnimalSearchController", AnimalSearchController);
    function AnimalSearchController(AnimalSearchService, $routeParams, $sce, $location, PetService, AdopterService) {
        var model = this;
        //model.searchPets = searchPets;
        model.searchAnimalsByLocation = searchAnimalsByLocation;
        model.searchShelterByLocation = searchShelterByLocation;
        model.trustUrlResource = trustUrlResource;
        model.selectPet = selectPet;
        model.selectShelter = selectShelter;
        model.findPetById = findPetById;
        model.userId = $routeParams.userId;
        model.adopterId = $routeParams.adopterId;
        model.pet = null;
        function init() {

        }
        init();

        function trustUrlResource(url) {
            return $sce.trustAsResourceUrl(url);
        }

        function selectPet(petShelterId,pet) {
            var petTmp = Object();
            petTmp.apiId = pet.id.$t.toString();
            petTmp.name = pet.name.$t.toString();
            petTmp.breed = pet.breeds.breed.$t;
            var photoTmp = [];
            for(i = 0; i < pet.media.photos.photo.length;i ++){
                photoTmp.push(pet.media.photos.photo[i].$t);

            }
           // console.log(pet);
            petTmp.photos =photoTmp;
            petTmp.description = pet.description.$t.toString();

            petTmp.shelterId = pet.shelterId.$t.toString();
            petTmp.sex = pet.sex.$t.toString();
            petTmp.size = pet.size.$t.toString();
            petTmp.age = pet.age.$t.toString();
            // for(int in model.animals){
            //     if(model.animals[int].id.$t === petId){
            //         pet.apiId = model.animals[int].id.$t;
            //         console.log(pet);
           // console.log(petTmp);
                    PetService.addPet(model.adopterId,petTmp)
                        .then(function (pet) {
                            console.log(pet.data);
                            var resPet = pet.data;
                            // AdopterService
                            //     .findAdopterById(model.adopterId)
                            //     .then(function (adopter) {
                            //         adopter.pets.push(petId);
                            //         AdopterService
                            //             .updateAdopter(model.adopterId, adopter)
                            //             .then(function (status) {
                            //                 return petId
                            //                     .then(function () {
                           $location.url("/user/"+model.userId+"/adopter/"+model.adopterId+"/pet/"+resPet._id+"/profile");
                            //                     });
                            //             });
                            //     });

                 });
            //     }
            // }
            // PetService
            //     .addPet(pet)
            // AdopterService
            //     .findAdopterById(model.adopterId)
            //     .then(function (adopter) {
            //         adopter.pets.push(petId);
            //         AdopterService
            //             .updateAdopter(model.adopterId, adopter)
            //             .then(function (status) {
            //                 return petId
            //                     .then(function () {
            //                         $location.url("/user/"+model.userId+"/adopter/"+model.adopterId+"/pet/"
            //                             +petId+"/profile");
            //                     });
            //             });
            //     });


        }

        function selectShelter(shelter) {
            $location.url("/shelter/"+shelter+"/profile");
        }

        function searchShelterByLocation(location) {
            AnimalSearchService
                .searchShelterByLocation(location)
                .then(function(response) {
                    model.shelters = response.petfinder.shelters.shelter;
                    console.log(model.shelters);
                });
        }

        function findPetById(petId) {
            AnimalSearchService
                .findPetById(petId)
                .then(function (response) {
                    model.animal = response.petfinder.pet;
                    return model.animal;
                });

        }

        function searchAnimalsByLocation() {
            console.log(model.location);
            AnimalSearchService
                .searchAnimalsByLocation(model.location)
                .then(function(response) {
                    model.animals = response.petfinder.pets.pet;
                });
        }

    }
})();