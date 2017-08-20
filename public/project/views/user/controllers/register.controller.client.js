(function () {
    angular
        .module("PetAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location, $rootScope) {
        var model = this;

        model.registerAdopter = registerAdopter;
        model.registerShelter = registerShelter;
        model.login = login;

        function init() {

        }
        init();


        function registerAdopter(user) {
            user.role = "adopter";
            user.isAdmin = false;
            if (!user) {
                model.errorMessage = "Please enter information";
                return;
            }
            UserService.findUserByUsername(user.username)
                .then(function (response) {
                    var _user = response.data;
                    if(_user === null) {
                        if(user.password && (user.password === user.password2)){
                            return UserService
                                .createUser(user)
                                .then(function (response) {
                                    var _user = response.data;
                                    login(user);
                                });
                        } else {
                            model.errorMessage = "Passwords don't match";
                        }
                    } else {
                        model.errorMessage = "User already exists";
                    }
                });
        }
        function registerShelter(user) {
            user.role = "shelter";
            user.isAdmin = false;
            if (!user) {
                model.errorMessage = "Please enter information";
                return;
            }
            UserService.findUserByUsername(user.username)
                .then(function (response) {
                    var _user = response.data;
                    if(_user === null) {
                        if(_user.password === _user.password2){
                            return UserService
                                .createUser(user)
                                .then(function (response) {
                                    var _user = response.data;
                                    login(user);
                                });
                        } else {
                            model.errorMessage = "Passwords don't match";
                        }
                    } else {
                        model.errorMessage = "User already exists";
                    }
                });
        }
        function login(user) {
            if(!user) {
                model.errorMessage = "User not found";
            } else {
                UserService
                    .login(user.username, user.password)
                    .then(function(res){
                        var _user = res.data;
                        if(_user === null) {
                            model.errorMessage = "User not found";
                        } else {
                            $rootScope.currentUser = _user;
                            $location.url("adopter-form/" + _user._id);
                        }
                    });
            }
        }
    }
})();

