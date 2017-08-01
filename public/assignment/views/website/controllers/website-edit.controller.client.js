(function (){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService) {
        var model = this;

        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
             WebsiteService
                .findWebsiteById(model.userId,model.websiteId)
                .then(function (response) {
                    model.website=response.data;
                });
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
