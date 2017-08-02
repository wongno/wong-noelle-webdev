(function (){
angular
    .module("WebAppMaker")
    .service("WidgetService", WidgetService);
function WidgetService ($http){
    var widgets= [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];
    var api = {
        "createWidget": createWidget,
        "findWidgetsByPageId": findWidgetsByPageId,
        "findWidgetById": findWidgetById,
        "updateWidget": updateWidget,
        "deleteWidget": deleteWidget,
    };
    return api;

    function createWidget(pageId, widget) {
        var url = "/api/page/"+pageId+"/widget";
        return $http.post(url,widget);
    }

    function findWidgetsByPageId(pageId) {
        var url = "/api/page/"+pageId+"/widget";
        return $http.get(url)
            .then(function (response) {
                return response.data;
            });
    }

    function findWidgetById(widgetId) {
        var url = "/api/widget/"+widgetId;
        return $http.get(url);
    }

    function updateWidget(widgetId, widget){
        var url = "/api/widget/"+widgetId;
        return $http.put(url,widget);
    }

    function deleteWidget(widgetId) {
        for(var w in widgets){
            if(widgets[w]._id === widgetId){
                if (w > -1) {
                    widgets.splice(w, 1);
                    return;
                }
            }
        }
        return null;
    }

}
})();