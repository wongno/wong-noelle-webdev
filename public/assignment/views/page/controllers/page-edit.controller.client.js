(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, PageService) {
        var model = this;
        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.pageId = $routeParams["pageId"]

        function init() {
            model.pages = PageService.findPageByWebsiteId(model.websiteId);
            model.page = PageService.findPageById(model.pageId);
        }
        init();
    }
})();