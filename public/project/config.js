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
            .when("/search/:petId/profile", {
                templateUrl: "views/anonymous/templates/detailed-animal-profile.view.client.html",
                controller: "AnimalProfileController",
                controllerAs: "model"
            })
    }
})();