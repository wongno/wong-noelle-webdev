(function () {
    angular
        .module("PetAppMaker")
        .controller("AnimalSearchController", AnimalSearchController);
    function AnimalSearchController(AnimalSearchService, $routeParams, $sce, $location) {
        var model = this;
        //model.searchPets = searchPets;
        model.searchAnimalsByLocation = searchAnimalsByLocation;
        model.trustUrlResource = trustUrlResource;
        model.renderPictures = renderPictures;
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
                });
        }

        function selectPet(pet){

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

    }
})();