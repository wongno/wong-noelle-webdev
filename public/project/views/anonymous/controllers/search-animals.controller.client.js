(function () {
    angular
        .module("PetAppMaker")
        .controller("AnimalSearchController", AnimalSearchController);
    function AnimalSearchController(AnimalSearchService, $routeParams) {
        var model = this;
        model.searchAnimalsByLocation = searchAnimalsByLocation;
        function init() {

        }
        init();

        function searchAnimalsByLocation() {
            AnimalSearchService.searchAnimalsByLocation(model.location)
                .then(function (response) {
                    model.animals = response.data;
                });
        }
    }
})();