(function () {

    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location) {
        var model = this;
        var userId = $routeParams["userId"];

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            UserService.findUserById(userId)
                .then(function (response) {
                    model.user = response.data;
                });
        }
        init();

        function updateUser(user) {
            UserService.updateUser(user._id, user)
                .then(function () {
                    $location();
                });
        }

        function deleteUser() {
            UserService.deleteUser(userId);
            // UserService.deleteUser(userId)
            //     .then(function (response) {
            //         model.user = response.data;
            //     });

        }
    }

})();
//         model.updateUser = updateUser;
//         model.deleteUser = deleteUser;
//
//         function init() {
//            UserService.findUserById(userId)
//                .then(function (response){
//                 model.user = response.data;
//
//             });
//         }
//         init();
//
//         function updateUser(user) {
//             UserService.updateUser(user._id, user);
//         }
//
//         function deleteUser(user) {
//             UserService.deleteUser(user._id);
//         }
//     }
//
// })();