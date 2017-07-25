(function (){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService) {
        var model = this;

        model.websiteId = $routeParams["websiteId"];
        model.userId = $routeParams.userId;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            model.websites = WebsiteService.findWebsitesByUser(model.userId);
            model.website = WebsiteService.findWebsiteById(model.websiteId);
        }
        init();

        function updateWebsite(website){
            WebsiteService.updateWebsite(model.websiteId,website);
        }
        
        function deleteWebsite() {
            WebsiteService.deleteWebsite(model.websiteId);
        }
    }

})();
