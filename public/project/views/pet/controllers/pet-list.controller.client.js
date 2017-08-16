(function () {
    angular
        .module("PetAppMaker")
        .controller("PetListController", PetListController);

    function PetListController($routeParams, PetService) {
        var model = this;

        model.shelterId = $routeParams.shelterId;
        model.userId = $routeParams.userId;

        function init() {
            PetService
                .findPetsByShelterId(model.shelterId)
                .then(function(pets){
                    console.log(model.pets);
                    model.pets = pets;
                });
            console.log(model.pets);
        }
        init();

    }
})();