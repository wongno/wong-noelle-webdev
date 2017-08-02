(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController(WidgetService, $routeParams, $location) {
        var model = this;
        model.pageId = $routeParams.pageId;
        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.createWidget = createWidget;
        model.setWidgetHeading = setWidgetHeading;
        model.setWidgetImage = setWidgetImage;
        model.setWidgetYoutube = setWidgetYoutube;
        var type = null;
        function init () {
            model.widget = null;
            type = null;
            WidgetService.findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
        }
        init();

        function setWidgetHeading(){
            console.log("type is heading");
          type = "HEADING";
            model.widget = model.createWidget();
            return model.widget;
        }
        function setWidgetImage(){
            type = "IMAGE";
            model.widget = model.createWidget();
            return model.widget;
        }
        function setWidgetYoutube(){
            type = "YOUTUBE";
            model.widget = model.createWidget();
            return model.widget;
        }
        function setW() {
            console.log("setW");

        }
        function createWidget() {
            console.log("here!!!!");
            var widget = Object();
            if(type === "HEADING"){
                console.log("widget is heading");
                widget.widgetType = "HEADING";
            }
            if(type === "IMAGE"){
                console.log("widget is image");
                widget.widgetType = "IMAGE";
            }
            if(type === "YOUTUBE"){
                console.log("widget is youtube");
                widget.widgetType = "YOUTUBE";
            }
            WidgetService.createWidget(model.pageId, widget)
                .then(function (response) {
                    model.widget = response.data;

                    return;
                })
        }
    }
})();
