(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.findWebsiteById = findWebsiteById;

        function init() {
            WebsiteService
                .findWebsitesByUser(model.userId)
                .then(function(response){
                    model.websites = response.data;
                });
        }
        init();

        function findWebsiteById(websiteId) {
            model.website = WebsiteService.findWebsiteById(websiteId);
        }
    }
})();