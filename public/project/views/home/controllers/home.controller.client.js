(function () {
    angular
        .module("PetAppMaker")
        .controller("HomeController", HomeController);

    function HomeController(AnimalSearchService, $routeParams, $sce, ShelterService,
                            $location, PetService, AdopterService) {
        var model = this;
        model.searchAnimals = searchAnimals;
        model.searchShelterByLocation = searchShelterByLocation;
        model.selectPet = selectPet;
        var petId = $routeParams["petId"];
        function init(){
        }
        init();

        function goBack() {
            model.pet=null;
            $location.url("/");
        }

        function selectPet(pet) {
            var petTmp = Object();
            petTmp.apiId = pet.id.$t.toString();
            petTmp.name = pet.name.$t.toString();
            petTmp.breed = pet.breeds.breed.$t;
            var photoTmp = [];
            for(i = 0; i < pet.media.photos.photo.length;i ++){
                photoTmp.push(pet.media.photos.photo[i].$t);
            }
            petTmp.photos = photoTmp;
            petTmp.description = pet.description.$t.toString();
            petTmp.animal = pet.animal.$t.toString();
            petTmp.shelterId = pet.shelterId.$t.toString();
            petTmp.sex = pet.sex.$t.toString();
            petTmp.size = pet.size.$t.toString();
            petTmp.age = pet.age.$t.toString();
            model.pet = petTmp;
            model.largePhotos = [];
            for(i=0;i<model.pet.photos.length;i++){
                var pic = model.pet.photos[i];
                if(pic.includes("width=500")){
                    model.largePhotos.push(pic);
                }
            }
            $('#left-button').on({
                'click': function() {
                    var size = model.largePhotos.length-1;
                    var src = "";
                    var int = 0;
                    if($('img').attr('src') === model.largePhotos[0]){
                        int = size;
                        src = model.largePhotos[int];
                        $('img').attr('src', src);
                    }else{
                        int = model.largePhotos.indexOf($('img').attr('src'));
                        src = model.largePhotos[int-1];
                        $('img').attr('src', src);
                    }
                }
            });
            $('#right-button').on({
                'click': function() {
                    var size = model.largePhotos.length-1;
                    var src = "";
                    var int = 0;
                    if($('img').attr('src') === model.largePhotos[size]){
                        int = 0;
                        src = model.largePhotos[int];
                        $('img').attr('src', src);
                    }else{
                        int = model.largePhotos.indexOf($('img').attr('src'));
                        src = model.largePhotos[int+1];
                        $('img').attr('src', src);
                    }
                }
            });
            return model.pet;
            // PetService
            //     .choosePet(petTmp)
            //     .then(function (response) {
            //         var resPet = response;
            //         console.log(response);
            //        // $location.url("/pet/"+resPet._id+"/profile");
            //     });
        }
        function searchAnimals(list){
            var search="";
            var searchLabels = ["animal=","size=", "sex=","age=","location=","breed="];
            for (var type in list) {
                if(list[type] === undefined){
                    continue;
                }
                search+= "&"+searchLabels[type]+list[type];
            }
            AnimalSearchService
                .searchPets(search)
                .then(function(response) {
                    model.animals = response.petfinder.pets.pet;
                });
        }
        function searchShelterByLocation(location) {
            AnimalSearchService
                .searchShelterByLocation(location)
                .then(function(response) {
                    model.shelters = response.petfinder.shelters.shelter;
                });
        }

    }
})();
