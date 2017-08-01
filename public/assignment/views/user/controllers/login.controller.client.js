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
            var promise = UserService.findUserByUsernameAndPassword(user.username, user.password);
            console.log("login1");
            promise
                .then(function (response) {
                    console.log("login2");
                    user = response.data;
                    console.log("login3");
                    if(user === null) {
                        console.log("login4");
                        model.errorMessage = "User not found";
                    } else {
                        $rootScope.currentUser = user;
                        $location.url("profile/"+user._id);
                    }
                });
        }
    }
})();