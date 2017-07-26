(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController(WidgetService, $routeParams) {
        var model = this;

        model.widgetId = $routeParams["widgetId"];
        model.pageId = $routeParams.pageId;
        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        function init() {
            model.widgets = WidgetService.findWidgetsByPageId(model.pageId);
            model.widget = WidgetService.findWidgetById(model.widgetId);
        }

        init();

        function updateWidget(widget){
            WidgetService.updateWidget(model.widgetId,widget);
        }

        function deleteWidget() {
            WidgetService.deleteWidget(model.widgetId);
        }
    }
})();