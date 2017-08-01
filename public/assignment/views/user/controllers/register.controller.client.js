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
            UserService.findUserByUsername(user.username)
                .then(function (response) {
                    var _user = response.data;
                    if(_user === "0") {
                        return UserService.createUser(user)
                    } else {
                        model.error = "User already exists";
                    }
                })
                .then(function (response) {
                    _user = response.data;
                    $location.url("/profile/" + _user._id);
                });
        }
            // if (!user) {
            //     model.errorMessage = "Please enter information"
            //     return;
            // }
            // if (user.password === user.password2) {
            //     var promise = UserService.findUserByUsername(user.username);
            //     promise
            //         .then(function(response){
            //             var _user = response.data;
            //             if (!_user) {
            //             var user = UserService.createUser(user);
            //             $location.url("/profile/" + user._id);
            //             model.errorMessage = UserService.returnUsers();
            //         } else {
            //             model.errorMessage = "User already exists";
            //             model.errorMessage = UserService.returnUsers();
            //         }});
            // } else {
            //     model.errorMessage = "Passwords don't match";
            // }
       // }
    }
})();