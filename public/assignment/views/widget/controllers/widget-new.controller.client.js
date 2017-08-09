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
        // model.setWidgetHeading = setWidgetHeading;
        // model.setWidgetImage = setWidgetImage;
        // model.setWidgetYoutube = setWidgetYoutube;
        model.createHeadingWidget = createHeadingWidget;
        function init () {
            WidgetService.findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
        }
        init();

        // function setWidgetHeading(){
        //     console.log("type is heading");
        //   type = "HEADING";
        //     model.widget = model.createWidget();
        //     return model.widget;
        // }
        // function setWidgetImage(){
        //     type = "IMAGE";
        //     model.widget = model.createWidget();
        //     return model.widget;
        // }
        // function setWidgetYoutube(){
        //     type = "YOUTUBE";
        //     model.widget = model.createWidget();
        //     return model.widget;
        // }
        // function setW() {
        //     console.log("setW");
        //
        // }

        function createHeadingWidget(){
            var widget = Object();
           widget.type = "HEADING";
            WidgetService
                .createWidget(model.pageId, widget)
                .then(function (response) {
                    var responseWidget = response.data;
                    responseWidget.type = "HEADING";
                    WidgetService.updateWidget(responseWidget._id,responseWidget);
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"
                    +model.pageId+"/widget/"+responseWidget._id);
                });
        }

        function createWidget() {
            console.log("here!!!!");
            var widget = Object();
            if(type === "HEADING"){
                console.log("widget is heading");
                widget.type = "HEADING";
            }
            if(type === "IMAGE"){
                console.log("widget is image");
                widget.type = "IMAGE";
            }
            if(type === "YOUTUBE"){
                console.log("widget is youtube");
                widget.type = "YOUTUBE";
            }
            WidgetService.createWidget(model.pageId, widget)
                .then(function (response) {
                    model.widget = response.data;

                    return;
                })
        }
    }
})();
