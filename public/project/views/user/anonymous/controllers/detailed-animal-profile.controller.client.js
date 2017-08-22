(function () {
    angular
        .module("PetAppMaker")
        .controller("AnimalProfileController",AnimalProfileController);
    function AnimalProfileController($routeParams, $http, AdopterService, PetService,$location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.adopterId = $routeParams.adopterId;
        var petId = $routeParams["petId"];
        model.followPet = followPet;
        model.unfollowPet = unfollowPet;
        function init() {
            AdopterService
                .findAdopterById(model.adopterId)
                .then(function (adopter) {
                    model.adopter = adopter;
                });
            PetService
                .findPetById(petId)
                .then(function (pet) {
                    model.animal = pet;
                    model.largePhotos = [];
                    model.mediumPhotos = [];
                    model.smallPhotos = [];
                    for(i=0;i<model.animal.photos.length;i++){
                        var pic = model.animal.photos[i];
                        if(pic.includes("width=500")){
                            model.largePhotos.push(pic);
                        }
                        if(pic.includes("width=95")){
                            model.smallPhotos.push(pic);
                        }
                        if(pic.includes("width=300")){
                            model.mediumPhotos.push(pic);
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
                })


        }
        init();

        function followPet(pet) {
            pet._followedBy.push(model.adopterId.toString());
           PetService
               .updatePet(pet._id, pet)
           .then(function () {
             $location.url("/user/"+model.userId+"/adopter/"+model.adopterId+"/search");
            });
        }

        function unfollowPet(pet) {
            var index = pet._followedBy.indexOf(model.adopterId.toString());
            pet._followedBy.splice(index, 1);
            PetService
                .updatePet(pet._id, pet)
            .then(function () {
              $location.url("/user/"+model.userId+"/adopter/"+model.adopterId+"/search");
            });

        }

    }
})();