(function () {
    angular
        .module("PetAppMaker")
        .controller("AdopterFormController", AdopterFormController);

    function AdopterFormController(AdopterService, $location, $routeParams, UserService) {
        var model = this;

        var userId = $routeParams["userId"];

        model.registerAdopter = registerAdopter;
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

        function registerAdopter(user) {
            user._link = userId;
            if (!user) {
                model.errorMessage = "Please enter information";
                return;
            }else{
                AdopterService
                    .createAdopter(user)
                    .then(function (response) {
                        var _user = response.data;
                        $location.url("profile/"+userId+"/adopter/" + _user._id);
                    });
            }
        }
    }
})();

