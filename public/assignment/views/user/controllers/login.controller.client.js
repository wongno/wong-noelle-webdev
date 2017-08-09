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
            if(!user) {
                model.errorMessage = "User not found";
                return;
            }
            UserService.findUserByCredentials(user.username, user.password)
                .then(function (response) {
                    var responseUser = response.data;
                    if(responseUser === null) {
                        model.errorMessage = "User not found";
                    } else {
                        $rootScope.currentUser = responseUser;
                        $location.url("profile/"+responseUser._id);
                    }
                });
        }
        // function login(user) {
        //     console.log("login");
        //     if(!user) {
        //         model.errorMessage = "User not found";
        //         return;
        //     }
        //      var promise = UserService.findUserByCredentials(user.username, user.password);
        //     promise
        //         .then(function (response) {
        //             user = response.data;
        //             if(user === null || user === "0") {
        //                 console.log("login4");
        //                 model.errorMessage = "User not found";
        //             } else {
        //                 console.log(user.username + "username");
        //                 $rootScope.currentUser = user;
        //                 $location.url("profile/"+ user._id);
        //             }
        //         });
        // }
    }
})();