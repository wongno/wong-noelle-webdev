(function () {

    angular
        .module("WebAppMaker")
        .controller("profileController", profileController)

    function profileController($routeParams, userService) {
        var model = this;
        var userId = $routeParams["userId"];

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            model.user = userService.findUserById(userId);
        }
        init();

        function updateUser(user) {
            userService.updateUser(user._id, user);
            model.errorMessage = userService.returnUsers();
        }

        function deleteUser(user) {
            userService.deleteUser(user._id);
            model.errorMessage = userService.returnUsers();
        }
    }

})();