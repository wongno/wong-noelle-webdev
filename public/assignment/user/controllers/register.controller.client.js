(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
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
                var _user = UserService.findUserByUsername(user.username);
                if (!_user) {
                    var user = UserService.createUser(user);
                    $location.url("/profile/" + user._id);
                    model.errorMessage = UserService.returnUsers();
                } else {
                    model.errorMessage = "User already exists";
                    model.errorMessage = UserService.returnUsers();
                }
            } else {
                model.errorMessage = "Passwords don't match";
            }
        }
    }
})();