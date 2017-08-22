(function () {
    angular
        .module("PetAppMaker")
        .controller("NewPetController", NewPetController);

    function NewPetController($routeParams, PetService,$location) {
        var model = this;

        model.createPet = createPet;
        model.shelterId = $routeParams.shelterId;
        model.userId = $routeParams.userId;

        function init() {

        }
        init();

        function createPet(pet) {
            PetService
                .createPet(model.shelterId,pet)
                .then(function () {
                    $location.url("/user/"+model.userId+"/shelter/"+model.shelterId+"/pet");
                })
        }

    }
})();