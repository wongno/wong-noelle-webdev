(function () {

    angular
        .module("PetAppMaker")
        .controller("ShelterProfileController", ShelterProfileController);

    function ShelterProfileController($routeParams, UserService, $location,ShelterService) {
        var model = this;
        var userId = $routeParams["userId"];
        var shelterId = $routeParams["shelterId"];

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        function init() {
            UserService.findUserById(userId)
                .then(function (response) {
                    model.user = response.data;
                });
            ShelterService.findShelterById(shelterId)
                .then(function (response) {
                    console.log(response.data);
                    model.shelter = response.data;
                });

        }

        init();

        function updateUser(user) {
            UserService.updateUser(user._id, user);
        }

        function deleteUser() {
            UserService.deleteUser(userId);
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/project/login");
                    });

        }
    }

})();
