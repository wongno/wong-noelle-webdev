(function (){
    angular
        .module("WebAppMaker")
        .controller(NewWebsiteController, "NewWebsiteController");

    function NewWebsiteController($routeParams, WebsiteService) {
        var model = this;

        model.userId = $routeParams.userId;

        function init() {
            model.websites = WebsiteService.findWebsitesByUser(model.userId);
        }
        init();
    }

})();
