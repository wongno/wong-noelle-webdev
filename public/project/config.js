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
            .when("/register", {
                templateUrl: "views/user/anonymous/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/adopter/profile/:adopterId", {
                templateUrl: "views/user/templates/adopter-profile.view.client.html",
                controller: "AdopterProfileController",
                controllerAs: "model"
            })
            .when("/shelter/profile/:shelterId", {
                templateUrl: "views/user/templates/shelter-profile.view.client.html",
                controller: "ShelterProfileController",
                controllerAs: "model"
            })
            .when("/pet/:petId/profile", {
                templateUrl: "views/user/anonymous/templates/detailed-animal-profile.view.client.html",
                controller: "AnimalSearchController",
                controllerAs: "model"
            })
            // .when("/shelter/:shelterId/profile", {
            //     templateUrl: "views/user/shelter/templates/shelter-profile.view.client.html",
            //     controller: "ShelterProfileController",
            //     controllerAs: "model"
            // })

    }
})();