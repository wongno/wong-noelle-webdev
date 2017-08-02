(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, WidgetService, $routeParams) {
        var model = this;

        model.pageId = $routeParams.pageId;
        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.getWidgetIncludeUrl = getWidgetIncludeUrl;
        model.trustUrlResource = trustUrlResource;
        model.trustHtmlContent = trustHtmlContent;
        function init() {
           WidgetService.findWidgetsByPageId(model.pageId)
                .then(function(widgets){
                    model.widgets = widgets;
                });
        }
        init();

        function trustHtmlContent(htmlContent) {
            return $sce.trustAsHtml(htmlContent);
        }

        function getWidgetIncludeUrl(widgetType) {
            return "views/widget/templates/widgets/widget-" + widgetType + ".view.client.html";
        }

        function trustUrlResource(url) {
            var youtubeUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split("/");
            youtubeUrl += urlParts[urlParts.length-1];
            return $sce.trustAsResourceUrl(youtubeUrl);
        }
    }
})();