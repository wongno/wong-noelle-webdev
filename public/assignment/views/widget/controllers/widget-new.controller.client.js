(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController(WidgetService, $routeParams) {
        var model = this;
        model.pageId = $routeParams.pageId;
        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.createWidget = createWidget;
        model.setWidgetHeading = setWidgetHeading;
        model.setWidgetImage = setWidgetImage;
        model.setWidgetYoutube = setWidgetYoutube;
        model.widget = model.createWidget();
        function init () {
            model.widgets = WidgetService.findWidgetsByPageId(model.pageId);
        }
        init();


        function setWidgetHeading(){
            model.widget.widgetType = "HEADING";
        }
        function setWidgetImage(){
            model.widget.widgetType = "IMAGE";
        }
        function setWidgetYoutube(){
            model.widget.widgetType = "YOUTUBE";
        }
        function createWidget() {
            var widget = Object();
            widget.widgetType = null;
            return WidgetService.createWidget(model.pageId, widget);
        }
    }
})();
