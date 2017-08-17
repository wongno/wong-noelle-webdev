(function () {
    angular
        .module("PetAppMaker")
        .controller("ShelterFormController", ShelterFormController);

    function ShelterFormController(ShelterService, $location, $routeParams, UserService) {
        var model = this;

        var userId = $routeParams["userId"];

        model.registerShelter = registerShelter;
        model.deleteUser = deleteUser;

        function init() {

        }
        init();

        function deleteUser() {
            UserService.deleteUser(userId)
                .then(function () {
                    $location.url("login");
                })
        }

        function registerShelter(user) {
            user._link = userId;
            if (!user) {
                model.errorMessage = "Please enter information";
                return;
            }else{
                ShelterService
                    .createShelter(user)
                    .then(function (response) {
                        console.log("got to shelterservice");
                        var _user = response.data;
                        $location.url("profile/"+userId+"/shelter/" + _user._id);
                    });
            }
        }
    }
})();

