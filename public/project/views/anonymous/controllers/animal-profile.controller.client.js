(function () {
    angular
        .module("PetAppMaker")
        .controller("AnimalProfileController",AnimalProfileController);
    function AnimalProfileController($routeParams, $http) {
        var model = this;
        model.petId = $routeParams["petId"];
        function init() {

        }
        init();
    }
})();