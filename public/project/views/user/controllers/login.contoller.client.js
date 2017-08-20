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

            if(!user) {
                model.errorMessage = "User not found";
                return;
            } else {
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
                    });
            }

        }
    }
})();