(function () {
    angular
        .module("wbdvDirectives",[])
        .directive("wbdv-sortable", wbdvsortable);

    function wbdvsortable($http){
        function linkFunction(scope, element) {
            console.log(element);
            var ul = element.find("ul");
            var index1 = -1;
            var index2 = -1;
            ul.sortable({
                start: function (event, ui) {
                    index1 = $(ui.item).index();
                },
                stop: function (event, ui) {
                    index2 = $(ui.item).index();
                    console.log([index1, index2]);
                    $http.put("page/:pageId/widget?index="+index1+"&final="+index2);
                }
            });
        }
        return {
            templateUrl: "../public/assignment/views/widget/templates/widget-list.view.client.html",
           // templateUrl: "public/assignment/views/widget/templates/widget-list.view.client.html",
            link: linkFunction
        }
    }
})();