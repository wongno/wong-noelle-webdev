(function (){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService) {
        var model = this;
        model.websiteId = $routeParams["websiteId"];
        model.userId = $routeParams.userId;

        function init() {
            model.websites = WebsiteService.findWebsitesByUser(model.userId);
            model.website = WebsiteService.findWebsiteById(model.websiteId);
        }
        init();
    }

})();
