(function () {
    angular
        .module("PetAppMaker")
        .controller("ShelterProfileController", ShelterProfileController);
    function ShelterProfileController(AnimalSearchService, $routeParams, $sce, $location) {
        var model = this;
        model.shelterId = $routeParams["shelterId"];
        function init() {
            AnimalSearchService
                .findPetsForShelter(model.shelterId)
                .then(function(response) {
                   model.shelters = response.petfinder.pets;

                });
            console.log(model.shelters);
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


    }
})();