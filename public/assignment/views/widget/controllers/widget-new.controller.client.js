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
        model.createImageWidget = createImageWidget;
        model.createYoutubeWidget = createYoutubeWidget;
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

        function createHtmlWidget(){
            var widget = Object();
            widget.type = "HTML";
            WidgetService
                .createWidget(model.pageId, widget)
                .then(function (response) {
                    var responseWidget = response.data;
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"
                        +model.pageId+"/widget/"+responseWidget._id);
                });
        }
        function createTextInputWidget(){
            var widget = Object();
            widget.type = "TEXT";
            WidgetService
                .createWidget(model.pageId, widget)
                .then(function (response) {
                    var responseWidget = response.data;
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"
                        +model.pageId+"/widget/"+responseWidget._id);
                });
        }
        function createHeadingWidget(){
            var widget = Object();
           widget.type = "HEADING";
            WidgetService
                .createWidget(model.pageId, widget)
                .then(function (response) {
                    var responseWidget = response.data;
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"
                    +model.pageId+"/widget/"+responseWidget._id);
                });
        }
        function createImageWidget(){
            var widget = Object();
            widget.type = "IMAGE";
            WidgetService
                .createWidget(model.pageId, widget)
                .then(function (response) {
                    var responseWidget = response.data;
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"
                        +model.pageId+"/widget/"+responseWidget._id);
                });
        }

        function createYoutubeWidget(){
            var widget = Object();
            widget.type = "YOUTUBE";
            WidgetService
                .createWidget(model.pageId, widget)
                .then(function (response) {
                    var responseWidget = response.data;
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"
                        +model.pageId+"/widget/"+responseWidget._id);
                });
        }
        
    }
})();
