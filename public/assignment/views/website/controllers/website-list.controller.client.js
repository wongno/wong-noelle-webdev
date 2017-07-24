(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.findWebsiteById = findWebsiteById;

        function init() {
            model.websites = WebsiteService.findWebsitesByUser(model.userId);
        }
        init();

        function findWebsiteById(websiteId) {
            website = WebsiteService.findWebsiteById(websiteId);
        }
        // function login(user) {
        //     if(!user) {
        //         model.errorMessage = "User not found1";
        //         return;
        //     }
        //     user = UserService.findUserByCredentials(user.username, user.password);
        //     if(user === null) {
        //         model.errorMessage = "User not found2";
        //         model.errorMessage = UserService.returnUsers();
        //     } else {
        //         $location.url("profile/"+user._id);
        //     }
        // }
    }
})();