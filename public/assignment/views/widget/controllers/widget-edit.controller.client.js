(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController(WidgetService, $routeParams, $location) {
        var model = this;

        model.widgetId = $routeParams["widgetId"];
        model.pageId = $routeParams.pageId;
        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        function init() {
            WidgetService.findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
            WidgetService.findWidgetById(model.widgetId)
                .then(function (response) {
                    model.widget = response.data;
                });
        }

        init();

        function updateWidget(widget){
            WidgetService.updateWidget(model.widgetId,widget)
                .then(function () {
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
                });
        }

        function deleteWidget() {
            WidgetService.deleteWidget(model.widgetId)
                .then(function () {
                $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
            });
        }
    }
})();