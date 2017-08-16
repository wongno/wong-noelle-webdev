(function () {
    angular
        .module("PetAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
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
                            .createAdopter(user)
                            .then(function (response) {
                                var _user = response.data;
                                if(_user){
                                    $location.url("adopter/profile/" + _user._id);
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
                            .createUser(user)
                            .then(function (response) {
                                var _user = response.data;
                                UserService.createShelter(_user._id,user)
                                    .then(function (response) {
                                        var shelter = response.data;
                                    $location.url("shelter/profile/" + shelter._id);
                                })
                            });

                    } else {
                        model.errorMessage = "User already exists";
                    }
                });
        }
    }
})();

