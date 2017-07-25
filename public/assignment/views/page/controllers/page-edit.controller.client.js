(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, PageService) {
        var model = this;
        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.pageId = $routeParams["pageId"];
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            model.pages = PageService.findPageByWebsiteId(model.websiteId);
            model.page = PageService.findPageById(model.pageId);
        }
        init();

        function updatePage(page){
            PageService.updateWebsite(model.pageId,page);
        }

        function deletePage() {
            PageService.deletePage(model.pageId);
        }
    }
})();