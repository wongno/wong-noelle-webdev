(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $rootScope) {
        var model = this;
        model.login = login;

        function init() {

        }
        init();

        function login(user) {
            console.log("login");
            if(!user) {
                model.errorMessage = "User not found";
                return;
            }
             var promise = UserService.findUserByCredentials(user.username, user.password);
            promise
                .then(function (response) {
                    user = response.data;
                    console.log(user.username + "username");
                    if(user === null || user === "0") {
                        console.log("login4");
                        model.errorMessage = "User not found";
                    } else {
                        console.log(user.username + "username");
                        $rootScope.currentUser = user;
                        $location.url("profile/"+ user._id);
                    }
                });
        }
    }
})();