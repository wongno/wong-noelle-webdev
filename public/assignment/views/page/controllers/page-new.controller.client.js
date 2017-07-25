(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, PageService) {
        var model = this;
        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.createPage = createPage;
        function init() {
            model.pages = PageService.findPageByWebsiteId(model.websiteId);
        }
        init();

        function createPage(page){
            if(!page){
                model.errorMessage = "Please fill in all fields"
                return;
            }
            PageService.createPage(model.websiteId, page);
        }
    }
})();