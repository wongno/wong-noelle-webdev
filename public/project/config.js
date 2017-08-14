(function(){
    angular
        .module("PetAppMaker")
        .config(configuration);
    function configuration($routeProvider, $httpProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/user/anonymous/templates/search-animals.view.client.html",
                controller: "AnimalSearchController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/anonymous/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/pet/:petId/profile", {
                templateUrl: "views/user/anonymous/templates/detailed-animal-profile.view.client.html",
                controller: "AnimalSearchController",
                controllerAs: "model"
            })
            .when("/shelter/:shelterId/profile", {
                templateUrl: "views/user/shelter/templates/shelter-profile.view.client.html",
                controller: "ShelterProfileController",
                controllerAs: "model"
            })

    }
})();