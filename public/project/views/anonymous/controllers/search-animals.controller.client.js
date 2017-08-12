(function () {
    angular
        .module("PetAppMaker")
        .controller("AnimalSearchController", AnimalSearchController);
    function AnimalSearchController(AnimalSearchService, $routeParams, $sce, $location) {
        var model = this;
        //model.searchPets = searchPets;
        model.searchAnimalsByLocation = searchAnimalsByLocation;
        model.searchShelterByLocation = searchShelterByLocation;
        model.trustUrlResource = trustUrlResource;
        model.selectPet = selectPet;
        model.selectShelter = selectShelter;
        function init() {

        }
        init();

        function trustUrlResource(url) {
            return $sce.trustAsResourceUrl(url);
        }

        function selectPet(pet) {
            $location.url("/search/pet/"+pet+"/profile");
        }

        function selectShelter(shelter) {
            $location.url("/search/shelter/"+shelter+"/profile");
        }

        function searchShelterByLocation(location) {
            AnimalSearchService
                .searchShelterByLocation(location)
                .then(function(response) {
                    model.shelters = response.petfinder.shelters.shelter;
                    console.log(model.shelters);
                });
        }

        function searchAnimalsByLocation(location) {
            AnimalSearchService
                .searchAnimalsByLocation(location)
                .then(function(response) {
                    model.animals = response.petfinder.pets.pet;
                });
        }

    }
})();