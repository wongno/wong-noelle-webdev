(function () {
    angular
        .module("PetAppMaker")
        .controller("PetListController", PetListController);

    function PetListController($routeParams, PetService) {
        var model = this;

        model.userId = $routeParams.userId;

        function init() {
            PetService
                .findPetsByShelterId(model.userId)
                .then(function(pets){
                    model.pets = pets;
                });
        }
        init();

    }
})();