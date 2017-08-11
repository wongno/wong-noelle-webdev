(function () {
    angular
        .module("PetAppMaker")
        .controller("AnimalSearchController", AnimalSearchController);
    function AnimalSearchController(AnimalSearchService, $routeParams, $sce) {
        var model = this;
        //model.searchPets = searchPets;
        model.searchAnimalsByLocation = searchAnimalsByLocation;
        model.trustUrlResource = trustUrlResource;
        model.renderPictures = renderPictures;
        model.getPicture=getPicture;
        function init() {

        }
        init();

        function trustUrlResource(url) {
            return $sce.trustAsResourceUrl(url);
        }
        function searchAnimalsByLocation(location) {
            AnimalSearchService
                .searchAnimalsByLocation(location)
                .then(function(response) {
                    model.animals = response.petfinder.pets.pet;
                //   data = (response.data.petfinder.pets);
             //   model.animals = JSON.parse(data);
              //  model.pictures = model.animals[0].media.photos.photo[0].$t;
                    //model.pets = model.animals.replace("jsonFlickrApi(","");

                //     pets = JSON.stringify(data);
                //     pets = pets.substring(1,data.length);
                // //    pets = pets.substring(0,data.length - 1);
                //     console.log(pets);
                //     pets = JSON.parse(pets);
                 // console.log(pets);
                });
        }

        function renderPictures() {
            var table = $("<table>");
            table.addClass("table");

            for(var u in model.animals) {
                var photo = u.media.photos.photo[0].$t;
                var tr = $("<tr>");
                var td = $("<td>");
                td.append(movie.Title);
                tr.append(td);

                var img = $("<img>");
                img.attr("src",photo);
                img.attr("height", "100");

                td = $("<td>");
                td.append(img);
                tr.append(td);

                table.append(tr);
            }

            $("#searchResults").append(table);
            table.sortable();
        }

        function getPicture() {
            for(var u in model.animals){
                console.log(model.animals[0].media.photos.photo[0].$t);
            }


        }

    }
})();