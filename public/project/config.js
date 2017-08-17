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
            .when("/adopter-form/:userId", {
                templateUrl: "views/user/templates/adopter-form.view.client.html",
                controller: "AdopterFormController",
                controllerAs: "model"
            })
            .when("/profile/:userId/adopter/:adopterId", {
                templateUrl: "views/adopter/templates/adopter-profile.view.client.html",
                controller: "AdopterProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
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
                resolve: { loggedin: checkLoggedin }
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
            .when("/pet/:petId/profile", {
                templateUrl: "views/user/anonymous/templates/detailed-animal-profile.view.client.html",
                controller: "AnimalSearchController",
                controllerAs: "model"
            })
        var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
            var deferred = $q.defer();
            $http.get('/api/loggedin').success(function(user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    deferred.resolve(user);
                } else {
                    deferred.reject();
                    $location.url('/');
                }
            });
            return deferred.promise;
        };


    }
})();