(function (){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.createWebsite = createWebsite;

        function init() {

            WebsiteService.findWebsitesByUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
        }
        init();

        function createWebsite(website) {
            if(!website){
                model.errorMessage = "Please fill in all fields"
                return;
            }
            WebsiteService.createWebsite(model.userId, website)
                .then(function () {
                    $location("user/"+model.userId+"/website");
                });
        }
    }

})();
