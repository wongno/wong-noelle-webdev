(function () {
    angular
        .module("PetAppMaker")
        .service("AnimalSearchService", AnimalSearchService);
    function AnimalSearchService($http,$routeParams) {

        var api = {
            "searchAnimalsByLocation":searchAnimalsByLocation

        };
        return api;

        function searchAnimalsByLocation(location) {
            var url = "http://api.petfinder.com/pet.find?key=c24a4370afabf3d116da27ad2ac7e483&format=json&location="+location+"&callback=JSON_CALLBACK";
           $http.jsonp(url)
               .success(function(data){
                   callback(null,data);
               })
               .error(function(data){
                   callback(null,data);
               });
            // $.getJSON(url, function (data) {
            //     console.log(data);
            //     return data;
            // }).then(function (response) {
            //         return response.data;
            //     })
            //     .done(function(petApiData) {
            //         alert('Data retrieved!');
            //     })
            //     .error(function(err) {
            //         alert('Error retrieving data!');
            //     });

        }
    }



})();