(function () {
    angular
        .module("PetAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location, $rootScope) {
        var model = this;

        model.registerAdopter = registerAdopter;
        model.registerShelter = registerShelter;

        function init() {

        }
        init();


        function registerAdopter(user) {
            user.role = "adopter";
            if (!user) {
                model.errorMessage = "Please enter information";
                return;
            }
            UserService.findUserByUsername(user.username)
                .then(function (response) {
                    var _user = response.data;
                    if(_user === null) {
                        return UserService
                            .register(user)
                            .then(function (response) {
                                var _user = response.data;
                                if(_user){
                                    $rootScope.currentUser = _user;
                                    $location.url("adopter-form/" + _user._id);
                                }
                            });
                    } else {
                        model.errorMessage = "User already exists";
                    }
                });
        }
        function registerShelter(user) {
            user.role = "shelter";
            if (!user) {
                model.errorMessage = "Please enter information";
                return;
            }
            UserService.findUserByUsername(user.username)
                .then(function (response) {
                    var _user = response.data;
                    if(_user === null) {
                        return UserService
                            .register(user)
                            .then(function (response) {
                                var _user = response.data;
                                $rootScope.currentUser = _user;
                                $location.url("shelter-form/" + _user._id);
                            });

                    } else {
                        model.errorMessage = "User already exists";
                    }
                });
        }
    }
})();

