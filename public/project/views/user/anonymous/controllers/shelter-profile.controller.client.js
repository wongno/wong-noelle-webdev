(function () {
    angular
        .module("PetAppMaker")
        .controller("ShelterSearchProfileController", ShelterSearchProfileController);
    function ShelterSearchProfileController(AnimalSearchService, $routeParams, $sce, $location,AdopterService
        , ShelterService,PetService) {
        var model = this;

        model.followShelter = followShelter;
        model.unfollowShelter = unfollowShelter;
        model.userId = $routeParams.userId;
        model.adopterId = $routeParams.adopterId;
        var shelterId = $routeParams["shelterId"];
        model.showPets = showPets;
        model.selectShelterPet = selectShelterPet;
        function init() {
            AdopterService
                .findAdopterById(model.adopterId)
                .then(function (adopter) {
                    model.adopter = adopter.data;
                });
            ShelterService
                .findShelterById(shelterId)
                .then(function (shelter) {
                    model.shelter = shelter;
                });
        }
        init();

        function trustUrlResource(url) {
            return $sce.trustAsResourceUrl(url);
        }

        function searchShelterByLocation(location) {
            AnimalSearchService
                .findPetsForShelter(location)
                .then(function(response) {
                    model.shelters = response.petfinder.pets.pet;
                });
        }

        function selectShelterPet(pet) {
            var petTmp = Object();
            petTmp.apiId = pet.id.$t.toString();
            petTmp.name = pet.name.$t.toString();
            petTmp.breed = pet.breeds.breed.$t;
            var photoTmp = [];
            for(i = 0; i < pet.media.photos.photo.length;i ++){
                photoTmp.push(pet.media.photos.photo[i].$t);
            }
            petTmp.photos =photoTmp;
            petTmp.description = pet.description.$t.toString();
            petTmp.animal = pet.animal.$t.toString();
            petTmp.shelterId = pet.shelterId.$t.toString();
            petTmp.sex = pet.sex.$t.toString();
            petTmp.size = pet.size.$t.toString();
            petTmp.age = pet.age.$t.toString();
            PetService.addPet(model.adopterId,petTmp)
                .then(function (pet) {
                    var resPet = pet.data;
                    $location.url("/user/"+model.userId+"/adopter/"+model.adopterId+"/pet/"+resPet._id+"/profile");
                });
        }
        function followShelter(shelter) {
            shelter._followedBy.push(model.adopter._id.toString());
            ShelterService
                .updateShelter(shelter._id, shelter)
                .then(function () {
                    $location.url("/user/"+model.userId+"/adopter/"+model.adopterId+"/search");
                });
        }

        function unfollowShelter(shelter) {
            var index = shelter._followedBy.indexOf(model.adopterId.toString());
            shelter._followedBy.splice(index, 1);
            ShelterService
                .updateShelter(shelter._id, shelter)
                .then(function () {
                 $location.url("/user/"+model.userId+"/adopter/"+model.adopterId+"/search");
                });

        }

        function showPets() {
            AnimalSearchService
                .findPetsForShelter(model.shelter.apiId)
                .then(function (response) {
                    model.shelterPets = response.petfinder.pets.pet;
                });
        }


    }
})();