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
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/adopter/profile/:userId", {
                templateUrl: "views/adopter/templates/adopter-profile.view.client.html",
                controller: "AdopterProfileController",
                controllerAs: "model"
            })
            .when("/shelter-form/:userId", {
                templateUrl: "views/user/templates/shelter-form.view.client.html",
                controller: "ShelterFormController",
                controllerAs: "model"
            })
            .when("/shelter/:userId/profile/:shelterId", {
                templateUrl: "views/shelter/templates/shelter-profile.view.client.html",
                controller: "ShelterProfileController",
                controllerAs: "model"
            })
            .when("/shelter/:userId/pet", {
                templateUrl: "views/pet/templates/pet-list.view.client.html",
                controller: "PetListController",
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