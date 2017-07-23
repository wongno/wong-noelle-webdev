(function () {

    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController($location, userService) {
        var model = this;

        model.login = login;

        function init() {

        }
        init();

        function login(user) {
            if(!user) {
                model.errorMessage = "User not found1";
                return;
            }
            user = userService.findUserByCredentials(user.username, user.password);
            if(user === null) {
                model.errorMessage = "User not found2";
                model.errorMessage = userService.returnUsers();
            } else {
                $location.url("profile/"+user._id);
            }
        }
    }
})();