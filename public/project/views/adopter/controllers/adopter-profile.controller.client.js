(function () {
    angular
        .module("PetAppMaker")
        .controller("AdopterProfileController", AdopterProfileController);

    function AdopterProfileController(AdopterService,$routeParams, UserService, $location) {
        var model = this;
        var userId = $routeParams["userId"];
        var adopterId = $routeParams["adopterId"];

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;


        function init() {
            UserService.findUserById(userId)
                .then(function (response) {
                    model.user = response.data;
                });
            AdopterService
                .findAdopterById(adopterId)
                .then(function (response) {
                    model.adopter = response.data;
                });
        }
        init();

        function updateUser(user) {
            UserService.updateUser(user._id, user);
        }

        function deleteUser() {
            UserService.deleteUser(adopterId);
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
