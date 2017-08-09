(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var model = this;

        model.registerUser = registerUser;

        function init() {

        }
        init();


        function registerUser(user) {
            if (!user) {
                model.errorMessage = "Please enter information";
                return;
            }
                UserService.findUserByUsername(user.username)
                    .then(function (response) {
                        var _user = response.data;
                        if(_user === null) {
                            return UserService.createUser(user);
                        } else {
                            model.errorMessage = "User already exists";
                        }
                    })
                    .then(function (response) {
                       var _user = response.data;
                       if(_user){
                           $location.url("/profile/" + _user._id);
                       }
                    });
        }
    }
})();

