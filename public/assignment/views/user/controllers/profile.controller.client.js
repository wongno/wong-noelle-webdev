(function () {

    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var model = this;
        var userId = $routeParams["userId"];

        model.updateUser = updateUser;
        model.unregister = unregister;

        function init() {
            UserService.findUserById(userId)
                .then(function (response) {
                    model.user = response.data;
                });
        }
        init();

        function updateUser(user) {
            UserService.updateUser(user._id, user);
        }

        function unregister() {

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