(function () {

    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)

    function ProfileController($routeParams, UserService) {
        var model = this;
        var userId = $routeParams["userId"];

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            model.user = UserService.findUserById(userId);
        }
        init();

        function updateUser(user) {
            UserService.updateUser(user._id, user);
            model.errorMessage = UserService.returnUsers();
        }

        function deleteUser(user) {
            UserService.deleteUser(user._id);
            model.errorMessage = UserService.returnUsers();
        }
    }

})();