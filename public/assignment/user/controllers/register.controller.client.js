(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(userService, $location) {
        var model = this;

        model.createUser = createUser;

        function init() {

        }
        init();

        function createUser(user) {
            if (!user) {
                model.errorMessage = "Please enter information"
                return;
            }
            if (user.password === user.password2) {
                var _user = userService.findUserByUsername(user.username);
                if (!_user) {
                    var user = userService.createUser(user);
                    $location.url("/profile/" + user._id);
                    model.errorMessage = userService.returnUsers();
                } else {
                    model.errorMessage = "User already exists";
                    model.errorMessage = userService.returnUsers();
                }
            } else {
                model.errorMessage = "Passwords don't match";
            }
        }
    }
})();