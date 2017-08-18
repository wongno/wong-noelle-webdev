(function () {
    angular
        .module("PetAppMaker")
        .controller("AdopterProfileController", AdopterProfileController);

    function AdopterProfileController(AdopterService,$routeParams, UserService, $location,PetService) {
        var model = this;
        var userId = $routeParams["userId"];
        var adopterId = $routeParams["adopterId"];

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.isFollowing = isFollowing;
        model.logout = logout;


        function init() {
            UserService.findUserById(userId)
                .then(function (response) {
                    model.user = response.data;
                });
            AdopterService
                .findAdopterById(adopterId)
                .then(function (response) {
                    model.adopter = response.data;
                    PetService
                        .findPetsByAdopter(model.adopter._id.toString())
                        .then(function (response) {
                            model.pets = response;
                        })
                });

        }
        init();

        function isFollowing(pet) {
            console.log(pet);
            if(pet._liked.indexOf(model.adopter._id.toString())=== -1){
                return "No"
            }else{
                return "Yes"
            }
        }

        function updateUser(user) {
            UserService.updateUser(user._id, user);
        }

        function deleteUser() {
            UserService.deleteUser(adopterId);
        }
        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/project/login");
                    });

        }
    }

})();
