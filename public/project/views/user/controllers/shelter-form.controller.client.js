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
            console.log("made it to registerShelter");

            user._link = userId;
            if (!user) {
                model.errorMessage = "Please enter information";
                return;
            }else{
                console.log("made it to registerShelter");
                ShelterService
                    .createShelter(user)
                    .then(function (response) {
                        var _user = response.data;
                        $location.url("shelter/"+userId+"/profile/" + _user._id);
                    });
            }
        }
    }
})();

