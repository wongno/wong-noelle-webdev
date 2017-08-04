(function (){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService,$location) {
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
                .findWebsiteById(model.websiteId)
                .then(function (response) {
                    model.website=response.data;
                });
        }
        init();

        function updateWebsite(website){
            WebsiteService
                .updateWebsite(model.websiteId,website)
                .then(function () {
                $location.url("anonymous/"+model.userId+"/website");
            });
        }
        
        function deleteWebsite() {
            WebsiteService.deleteWebsite(model.websiteId).
            then(function () {
                $location.url("anonymous/"+model.userId+"/website");
            });
        }
    }

})();
