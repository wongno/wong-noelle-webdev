(function () {
    angular
        .module("PetAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $rootScope, ShelterService, AdopterService) {
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
                    console.log(response.data);
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
                                    $location.url("profile/"+responseUser._id+"/shelter/"+shelter._id);
                                })
                        }else if(responseUser.role.value="adopter"){
                            AdopterService
                                .findAdopterByUserId(responseUser._id)
                                .then(function (response) {
                                    var adopter = response.data;
                                    $rootScope.currentUser = adopter;
                                    $location.url("profile/"+responseUser._id+"/adopter/"+adopter._id);
                                })
                        }

                    }
                });
        }
    }
})();