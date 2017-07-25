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
    }
})();