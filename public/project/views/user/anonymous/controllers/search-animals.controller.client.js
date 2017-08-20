(function () {
    angular
        .module("PetAppMaker")
        .controller("AnimalSearchController", AnimalSearchController);
    function AnimalSearchController(AnimalSearchService, $routeParams, $sce, ShelterService,
                                    $location, PetService, AdopterService) {
        var model = this;
        model.searchAnimalsByLocation = searchAnimalsByLocation;
        model.searchShelterByLocation = searchShelterByLocation;
        model.trustUrlResource = trustUrlResource;
        model.selectPet = selectPet;
        model.selectShelter = selectShelter;
        model.findPetById = findPetById;
        model.searchAnimals = searchAnimals;
        model.userId = $routeParams.userId;
        model.adopterId = $routeParams.adopterId;
        model.pet = null;
        function init() {
        }
        init();

        function trustUrlResource(url) {
            return $sce.trustAsResourceUrl(url);
        }

        function selectPet(pet) {
            console.log('selectPet');
            var petTmp = Object();
            petTmp.apiId = pet.id.$t.toString();
            petTmp.name = pet.name.$t.toString();
            petTmp.breed = pet.breeds.breed.$t;
            var photoTmp = [];
            for(i = 0; i < pet.media.photos.photo.length;i ++){
                photoTmp.push(pet.media.photos.photo[i].$t);
            }
            petTmp.photos =photoTmp;
            petTmp.description = pet.description.$t.toString();
            petTmp.animal = pet.animal.$t.toString();
            petTmp.shelterId = pet.shelterId.$t.toString();
            petTmp.sex = pet.sex.$t.toString();
            petTmp.size = pet.size.$t.toString();
            petTmp.age = pet.age.$t.toString();
                    PetService.addPet(model.adopterId,petTmp)
                        .then(function (pet) {
                            console.log(pet.data);
                            var resPet = pet.data;
                           $location.url("/user/"+model.userId+"/adopter/"+model.adopterId+"/pet/"+resPet._id+"/profile");
                 });
        }

        function selectShelter(shelter) {
            console.log(shelter);
            var shelterTmp = Object();
            if(shelter.email.$t!==undefined){
                shelterTmp.email= shelter.email.$t.toString();
            }

            shelterTmp.apiId = shelter.id.$t.toString();
            shelterTmp.name = shelter.name.$t.toString();

            shelterTmp.location = shelter.address1.$t.toString()+" ";
            shelterTmp.location += shelter.city.$t.toString()+" ";
            shelterTmp.location += shelter.state.$t.toString()+", ";
            shelterTmp.location += shelter.zip.$t.toString();

            ShelterService.addShelter(model.adopterId,shelterTmp)
                .then(function (shelter) {
                    console.log(shelter.data);
                    var resShelter = shelter.data;
                    $location.url( "/user/"+model.userId+"/adopter/"+model.adopterId+"/shelter/"
                        +resShelter._id+"/profile");
                   });
        }

        function searchShelterByLocation(location) {
            AnimalSearchService
                .searchShelterByLocation(location)
                .then(function(response) {
                    model.shelters = response.petfinder.shelters.shelter;
                    console.log(model.shelters);
                });
        }

        function searchAnimals(list){
            var search="";
            var searchLabels = ["animal=","size=", "sex=","age=","location=","breed="];
            for (var type in list) {
                console.log("&"+searchLabels[type]+list[type]);
                if(list[type] === undefined){
                    continue;
                }
                search+= "&"+searchLabels[type]+list[type];
            }
            AnimalSearchService
                .searchPets(search)
                .then(function(response) {
                    console.log(response);
                   model.animals = response.petfinder.pets.pet;
                    // for(int in model.animals) {
                    //
                    //     var $img = $('<img style="padding-bottom: 0px"/>');
                    //     var $finalImg = ($img).attr({src: model.animals[int].media.photos.photo[1].$t});
                    //     var $newh4 = $("<h4></h4>").append(document.createTextNode(model.animals[int].name.$t));
                    //     var $newA = $('<a name></a>');
                    //         $newA.attr({name:int});
                    //     $newA.append($newh4).append($finalImg);
                    //     var $newdiv = $('<div id="thisClicked" name="int" style="text-align: center" class="col-xs-4 col-lg-2">').append($newA);
                    //     $newdiv.attr({id:"thisClicked"+int});
                    //     $newdiv.attr({name:int});
                    //     if (int%3 === 0) {
                    //         var $div2 = $('<div id="divider" style="text-align: center" class="row"></div>');
                    //         $div2.append($newdiv);
                    //         $('#petResults').append($div2);
                    //     } else {
                    //         $('#divider').append($newdiv);
                    //     }
                    // }
                    // for(int in model.animals) {
                    //     var $div2 = $('<div style="text-align: center" class="row"></div>');
                    //     var $img = $('<img style="padding-bottom: 0px"/>');
                    //     var $finalImg = ($img).attr({src: model.animals[int].media.photos.photo[1].$t});
                    //     var $newh4 = $("<h4></h4>").append(document.createTextNode(model.animals[int].name.$t));
                    //     var $newA = $('<a ng-click="model.selectPet(int)"></a>');
                    //     $newA.attr(document.createTextNode(model.selectPet(int)));
                    //     $newA.append($newh4).append($finalImg);
                    //     var $newdiv = $('<div id="thisClicked" style="text-align: center" class="col-xs-4 col-lg-2">').append($newA);
                    //     if ((int + 1) % 3 === 0) {
                    //         $('#petResults').append($newdiv).append($div2);
                    //     } else {
                    //         $('#petResults').append($newdiv);
                    //     }
                    //
                    // }
                });
        }

        function findPetById(petId) {
            AnimalSearchService
                .findPetById(petId)
                .then(function (response) {
                    model.animal = response.petfinder.pet;
                    return model.animal;
                });

        }

        function searchAnimalsByLocation() {
            console.log(model.location);
            AnimalSearchService
                .searchAnimalsByLocation(model.location)
                .then(function(response) {
                    model.animals = response.petfinder.pets.pet;
                });
        }

    }
})();