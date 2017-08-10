(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);
    function FlickrImageSearchController(FlickrService, WidgetService, $routeParams, $location){
        var model = this;
        model.widgetId = $routeParams["widgetId"];
        model.pageId = $routeParams.pageId;
        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;
        function init() {
            WidgetService.findWidgetById(model.widgetId)
                .then(function (response) {
                    model.widget = response.data;
                });
        }

        init();

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
          model.widget.url = url;
            WidgetService
                .updateWidget(model.widgetId, model.widget)
                .then(function () {
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
                });
        }

    }
})();