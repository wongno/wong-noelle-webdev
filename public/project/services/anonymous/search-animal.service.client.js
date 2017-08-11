(function () {
    angular
        .module("PetAppMaker")
        .service("AnimalSearchService", AnimalSearchService);
    function AnimalSearchService($http,$routeParams,$sce) {

        this.searchPets = searchPets;
        this.searchAnimalsByLocation = searchAnimalsByLocation;

        var key = "c24a4370afabf3d116da27ad2ac7e483";
        var secret = "5ad6a3f9a39a1658";
        var urlBase = "http://api.petfinder.com/my.method?key=12345&arg1=foo&arg2=foo2&format=json&output=basic";

        function searchAnimalsByLocation(location) {
            var url = urlBase
                .replace("my.method", "pet.find")
                .replace("12345", key)
                .replace("arg1", "animal")
                .replace("foo", "dog")
                .replace("arg2", "location")
                .replace("foo2", location);
            var result = null;
            return $.getJSON($sce.trustAsResourceUrl(url+"&callback=?"),function (data) {
                return data;
            });
                // .then(function (response) {
                //     return response.data;
                //
                // });
            //return $http.jsonp($sce.trustAsResourceUrl(url));
            // return $.getJSON($sce.trustAsResourceUrl(url))
            //     .done(function (response) {
            //         return response;
            //     });
        }

        function searchPets() {
            var url = urlBase
                .replace("my.method", "pet.getRandom")
                .replace("12345", key)
                .replace("arg1", "animal")
                .replace("foo", model.animal)
                .replace("arg2", "output")
                .replace("foo2", "basic");
            console.log(url);
            return $http.get(url);
        }

        //
        // var api = {
        //     "searchAnimalsByLocation":searchAnimalsByLocation
        //
        // };
        // return api;
        //
        // function searchAnimalsByLocation(location) {
        //     var url = "http://api.petfinder.com/pet.find?key=c24a4370afabf3d116da27ad2ac7e483&format=json&location="+location+"&callback=JSON_CALLBACK";
        //    $http.jsonp(url)
        //        .success(function(data){
        //            callback(null,data);
        //        })
        //        .error(function(data){
        //            callback(null,data);
        //        });
        // }
    }



})();