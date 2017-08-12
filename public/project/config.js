(function(){
    angular
        .module("PetAppMaker")
        .config(configuration);
    function configuration($routeProvider, $httpProvider) {
        $routeProvider
            .when("/search", {
                templateUrl: "views/anonymous/templates/search-animals.view.client.html",
                controller: "AnimalSearchController",
                controllerAs: "model"
            })
            .when("/search/pet/:petId/profile", {
                templateUrl: "views/anonymous/templates/detailed-animal-profile.view.client.html",
                controller: "AnimalProfileController",
                controllerAs: "model"
            })
            .when("/search/shelter/:shelterId/profile", {
                templateUrl: "views/shelter/templates/shelter-profile.view.client.html",
                controller: "ShelterProfileController",
                controllerAs: "model"
            })

    }
})();