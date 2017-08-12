(function(){
    angular
        .module("PetAppMaker")
        .config(configuration);
    function configuration($routeProvider, $httpProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/anonymous/templates/search-animals.view.client.html",
                controller: "AnimalSearchController",
                controllerAs: "model"
            })
            .when("/pet/:petId/profile", {
                templateUrl: "views/anonymous/templates/detailed-animal-profile.view.client.html",
                controller: "AnimalProfileController",
                controllerAs: "model"
            })
            .when("/shelter/:shelterId/profile", {
                templateUrl: "views/shelter/templates/shelter-profile.view.client.html",
                controller: "ShelterProfileController",
                controllerAs: "model"
            })

    }
})();