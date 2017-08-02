(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, PageService, $location) {
        var model = this;
        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.createPage = createPage;
        function init() {
            PageService.findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
        }
        init();

        function createPage(page){
            if(!page){
                model.errorMessage = "Please fill in all fields"
                return;
            }
            PageService.createPage(model.websiteId, page)
                .then(function () {
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
                })
        }
    }
})();