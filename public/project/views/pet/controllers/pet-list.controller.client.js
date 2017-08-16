(function () {
    angular
        .module("PetAppMaker")
        .controller("PetListController", PetListController);

    function PetListController($routeParams, PetService) {
        var model = this;

        model.shelterId = $routeParams.shelterId;

        function init() {
            PetService
                .findPetsByShelterId(model.shelterId)
                .then(function(pets){
                    model.pets = pets;
                });
        }
        init();

    }
})();