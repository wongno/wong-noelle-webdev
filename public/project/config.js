(function(){
    angular
        .module("PetAppMaker")
        .config(configuration);
    function configuration($routeProvider, $httpProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/templates/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: "views/home/templates/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/pet/:petId/profile", {
                templateUrl: "views/home/templates/detailed-animal-profile.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/user/:userId/adopter/:adopterId/search", {
                templateUrl: "views/user/anonymous/templates/search-animals.view.client.html",
                controller: "AnimalSearchController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/templates/project-login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/project-register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/adopter-form/:userId", {
                templateUrl: "views/user/templates/adopter-form.view.client.html",
                controller: "AdopterFormController",
                controllerAs: "model"
            })
            .when("/profile/:userId/adopter/:adopterId", {
                templateUrl: "views/adopter/templates/adopter-profile.view.client.html",
                controller: "AdopterProfileController",
                controllerAs: "model",
                // resolve: {
                //     user: checkLogin
                // }
            })
            .when("/shelter-form/:userId", {
                templateUrl: "views/user/templates/shelter-form.view.client.html",
                controller: "ShelterFormController",
                controllerAs: "model"
            })
            .when("/profile/:userId/shelter/:shelterId", {
                templateUrl: "views/shelter/templates/shelter-profile.view.client.html",
                controller: "ShelterProfileController",
                controllerAs: "model",
                // resolve: {
                //     user: checkLogin
                // }
            })
            .when("/user/:userId/shelter/:shelterId/pet", {
                templateUrl: "views/pet/templates/pet-list.view.client.html",
                controller: "PetListController",
                controllerAs: "model"
            })
            .when("/user/:userId/shelter/:shelterId/pet/new", {
                templateUrl: "views/pet/templates/pet-new.view.client.html",
                controller: "NewPetController",
                controllerAs: "model"
            })
            .when("/user/:userId/shelter/:shelterId/pet/:petId", {
                templateUrl: "views/pet/templates/pet-edit.view.client.html",
                controller: "EditPetController",
                controllerAs: "model"
            })
            .when("/user/:userId/adopter/:adopterId/pet/:petId/profile", {
                templateUrl: "views/user/anonymous/templates/detailed-animal-profile.view.client.html",
                controller: "AnimalProfileController",
                controllerAs: "model"
            })
            .when("/user/:userId/adopter/:adopterId/shelter/:shelterId/profile", {
                templateUrl: "views/user/anonymous/templates/shelter-profile.view.client.html",
                controller: "ShelterSearchProfileController",
                controllerAs: "model"
            })
            .when("/user/:userId/adopter/:adopterId/profile/:username", {
                templateUrl: "views/adopter/templates/searched-user-profile.view.client.html",
                controller: "SearchUserController",
                controllerAs: "model"
            });
        // function checkLogin(UserService, $q, $location) {
        //     var deferred = $q.defer();
        //     UserService
        //         .checkLogin()
        //         .then(function (user) {
        //             if(user === '0') {
        //                 deferred.resolve(null);
        //             } else {
        //                 deferred.resolve(user);
        //             }
        //         });
        //     return deferred.promise;
        // }


    }
})();