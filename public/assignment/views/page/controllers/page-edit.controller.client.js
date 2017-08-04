(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, PageService, $location) {
        var model = this;
        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.pageId = $routeParams["pageId"];
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            PageService
                .findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
             PageService
                .findPageById(model.pageId)
                .then(function (response) {
                    model.page = response.data;
                });
        }
        init();

        function updatePage(page){
            PageService.updatePage(model.pageId,page)
                .then(function () {
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
                });
        }

        function deletePage() {
            PageService.deletePage(model.pageId)
                .then(function () {
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
                });
        }
    }
})();