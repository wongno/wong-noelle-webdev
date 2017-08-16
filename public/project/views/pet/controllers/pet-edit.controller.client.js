(function () {
    angular
        .module("PetAppMaker")
        .controller("EditPetController", EditPetController);

    function EditPetController($routeParams, PetService,$location) {
        var model = this;

        model.deletePet = deletePet;
        model.updatePet = updatePet;
        model.shelterId = $routeParams.shelterId;
        model.userId = $routeParams.userId;
        var petId = $routeParams["petId"];

        function init() {
            PetService
                .findPetById(petId)
                .then(function (pet) {
                    model.pet = pet;
                });

        }
        init();

        function deletePet() {
            PetService
                .deletePet(petId)
                .then(function () {
                    $location.url("/user/"+model.userId+"/shelter/"+model.shelterId+"/pet");
                })
        }
        function updatePet(pet) {
            PetService
                .updatePet(pet._id,pet)
                .then(function () {
                    $location.url("/user/"+model.userId+"/shelter/"+model.shelterId+"/pet");
                })
        }

    }
})();