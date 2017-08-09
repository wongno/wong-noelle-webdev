(function () {
    angular
        .module("wbdvDirectives",[])
        .directive("widgetList", widgetListDirective);

    function widgetListDirective($http,$routeParams){
        function linkFunction(scope,element) {
            var ul = $(element.find("ul"));
            var index1 = -1;
            var index2 = -1;
            ul.sortable({
                start: function (event, ui) {
                    index1 = $(ui.item).index();
                    console.log(index1);
                    console.log(parseInt(index1));
                },
                stop: function (event, ui) {
                    index2 = $(ui.item).index();
                    console.log([index2]);
                    console.log([index1, index2]);
                    $http.put("/api/page/:pageId/widget?index="+index1+"&final="+index2);
                }
            });
        }
        return {
            templateUrl: "views/widget/templates/widget-list.html",
            link: linkFunction
        }
    }
})();