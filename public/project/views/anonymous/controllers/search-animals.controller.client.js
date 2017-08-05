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

        function searchAnimalsByLocation(location) {
            model.animals=AnimalSearchService
                .searchAnimalsByLocation(location);
        }

    }
})();