(function () {
    angular
        .module("PetAppMaker")
        .controller("PetListController", PetListController);

    function PetListController($routeParams, PetService) {
        var model = this;

        model.shelterId = $routeParams.shelterId;

        function init() {
            console.log(model.shelterId);
            PetService
                .findPetsByShelterId(model.shelterId)
                .then(function(pets){
                    model.pets = pets;
                });
        }
        init();

    }
})();