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
            if(!user.username || !user.password || !user) {
                model.errorMessage = "Enter your username and password";
            }else {
                UserService
                    .findUserByUsername(user.username)
                    .then(function (resUser) {
                        var rUser = resUser.data;
                        if(!rUser){
                            model.errorMessage = "User not found";
                        } else{
                            UserService
                                .login(user.username, user.password)
                                .then(function(response) {
                                    var user = response.data;
                                    if(user === null) {
                                        model.errorMessage = "User not found";
                                    } else {
                                        if(user.role[0]==="shelter"){
                                            console.log(user);
                                            ShelterService
                                                .findShelterByUserId(user._id)
                                                .then(function (response) {
                                                    var shelter = response.data;
                                                    $rootScope.currentUser = shelter;
                                                    $location.url("profile/"+user._id+"/shelter/"+shelter._id);
                                                })
                                        } else if(user.role[0]==="adopter"){
                                            AdopterService
                                                .findAdopterByUserId(user._id)
                                                .then(function (response) {
                                                    var adopter = response.data;
                                                    $rootScope.currentUser = adopter;
                                                    $location.url("profile/"+user._id+"/adopter/"+adopter._id);
                                                })
                                        }
                                    }
                                }).then(function(err) {
                                model.errorMessage = "User not found";
                            });
                        }
                    });
            }

        }
    }
})();