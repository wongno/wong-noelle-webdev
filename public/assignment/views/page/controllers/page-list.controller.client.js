(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var model = this;

        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.page = findPageById;
        function init() {
            model.pages = PageService.findPageByWebsiteId(model.websiteId);
        }
        init();
        function findPageById(pageId) {
            model.page = PageService.findPageById(pageId);
        }
    }
})();