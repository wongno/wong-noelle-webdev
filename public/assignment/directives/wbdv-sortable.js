(function () {
    angular
        .module("wbdvDirectives",[])
        .directive("widgetList", widgetListDirective);

    function widgetListDirective($http,$routeParams){
        function linkFunction(scope, element) {
            var ul = $(element).find("ul");
            var startIndex = -1;
            var endIndex = -1;
            ul.sortable({
                start: function (event, ui) {
                    startIndex = $(ui.item).index();
                },
                stop: function (event, ui) {
                    endIndex = $(ui.item).index();
                    $http.put("/api/page/:pageId/widget?index="+startIndex+"&final="+endIndex);
                }
            });
        }
        return {
            templateUrl: "views/widget/templates/widget-list.html",
            link: linkFunction
        };
    }
})();