(function () {
    angular
        .module("PetAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $rootScope, ShelterService) {
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
                        if(responseUser.role.value="shelter"){
                            ShelterService
                                .findShelterByUserId(responseUser._id)
                                .then(function (response) {
                                    var shelter = response.data;
                                    $rootScope.currentUser = shelter;
                                    $location.url("shelter/"+responseUser._id+"/profile/"+shelter._id);
                                })
                        }

                    }
                });
        }
    }
})();