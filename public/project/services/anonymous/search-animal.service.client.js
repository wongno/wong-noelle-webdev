(function () {
    angular
        .module("PetAppMaker")
        .search("AnimalSearchService", AnimalSearchService);
    function AnimalSearchService($http,$routeParams) {
        var api = {
            "searchAnimalsByLocation":searchAnimalsByLocation,

        };
        return api;
    }

    function searchAnimalsByLocation(location) {
        var url = "http://api.petfinder.com/pet.find?key=c24a4370afabf3d116da27ad2ac7e483&location="+location;
        return $http.get(url);
    }

})();