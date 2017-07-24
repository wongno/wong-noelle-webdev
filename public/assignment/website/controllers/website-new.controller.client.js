(function (){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, WebsiteService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.createWebsite = createWebsite;

        function init() {

            model.websites = WebsiteService.findWebsitesByUser(model.userId);
        }
        init();

        function createWebsite(website) {
            if(!website){
                model.errorMessage = "Please fill in all fields"
                return;
            }
            WebsiteService.createWebsite(model.userId, website);
        }
    }

})();
