(function () {

    angular
        .module("PetAppMaker")
        .controller("ShelterProfileController", ShelterProfileController);

    function ShelterProfileController($routeParams, UserService, $location) {
        var model = this;
        var userId = $routeParams["userId"];

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            UserService.findUserById(userId)
                .then(function (response) {
                    model.user = response.data;
                });
        }
        init();

        function updateUser(user) {
            UserService.updateUser(user._id, user);
        }

        function deleteUser() {
            UserService.deleteUser(userId);
        }
    }

})();
