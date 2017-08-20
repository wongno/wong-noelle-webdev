(function () {
    angular
        .module("PetAppMaker")
        .controller("AdopterProfileController", AdopterProfileController);

    function AdopterProfileController(ShelterService,AdopterService,$routeParams, AnimalSearchService,
                                      UserService, $location,PetService) {
        var model = this;
        var userId = $routeParams["userId"];
        var adopterId = $routeParams["adopterId"];

        model.followUser = followUser;
        model.selectShelter = selectShelter;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.isFollowing = isFollowing;
        model.logout = logout;
        model.searchUsersByUsername =searchUsersByUsername;


        function init() {
            UserService.findUserById(userId)
                .then(function (response) {
                    model.user = response.data;
                    if(model.user.following.length>0){
                        for(int in model.user.following){
                            UserService
                                .findUserById(model.user.following[int])
                                .then(function (response) {
                                    console.log(response);
                                    var rUser = response.data;
                                    var $newh4 = $( "<h4></h4>" );
                                    var $newli = $('<li class="list-group-item"></li>');
                                    var $header = $newh4.append( document.createTextNode( rUser.username.toString() ) );
                                    var $list = $newli.append($header);
                                    $('#followingList').append($list);
                                })

                        }

                    }
                    if(model.user.followedBy.length>0){
                        for(int in model.user.followedBy){
                            UserService
                                .findUserById(model.user.following[int])
                                .then(function (response) {
                                    console.log(response);
                                    var rUser = response.data;
                                    var $newh4 = $( "<h4></h4>" );
                                    var header = $newh4.append( document.createTextNode( rUser.username.toString() ) );
                                    var $newli = $('<li class="list-group-item"></li>')
                                    var list = $newli.append(header);
                                    $('#followedBy').append('list');
                                })
                        }

                    }
                });
            AdopterService
                .findAdopterById(adopterId)
                .then(function (response) {
                    model.adopter = response.data;
                    PetService
                        .findPetsByAdopter(model.adopter._id.toString())
                        .then(function (response) {
                            model.pets = response;
                        });
                    ShelterService
                        .findSheltersByAdopter(model.adopter._id.toString())
                        .then(function (response) {
                            model.shelters = response;
                        })
                });

        }
        init();

        function isFollowing(pet) {
            if(pet._followedBy.indexOf(model.adopter._id.toString())=== -1){
                return "No"
            }else{
                return "Yes"
            }
        }

        function searchUsersByUsername(username) {
            UserService
                .findUserByUsername(username)
                .then(function (user) {
                    model.foundUser = user.data;
                    return model.foundUser;
                });
        }

        function followUser() {
            model.foundUser.followedBy.push(model.user._id);
            UserService
                .updateUser(model.foundUser._id, model.foundUser)
                .then(function () {
                    model.user.following.push(model.foundUser._id);
                    UserService
                        .updateUser(userId, model.user)
                        .then(function () {
                            $location.url("/user/" + userId + "/adopter/" + adopterId + "/profile/" + model.foundUser.username);
                        })
                });
        }
        function selectShelter(shelterId) {
            AnimalSearchService
                .findShelterById(shelterId)
                .then(function(response) {
                    var shelter = response.petfinder.shelter;
                    var shelterTmp = Object();
                    if(!(shelter.email.$t===undefined)){
                        shelterTmp.email=  shelter.email.$t.toString();
                    }
                    shelterTmp.apiId =  shelter.id.$t.toString();
                    shelterTmp.name = shelter.name.$t.toString();

                    shelterTmp.location = shelter.address1.$t.toString()+" ";
                    shelterTmp.location +=  shelter.city.$t.toString()+" ";
                    shelterTmp.location += shelter.state.$t.toString()+", ";
                    shelterTmp.location +=  shelter.zip.$t.toString();

                    ShelterService.addShelter(adopterId,shelterTmp)
                        .then(function (shelter) {
                            console.log(shelter.data);
                            var resShelter = shelter.data;
                            $location.url( "/user/"+userId+"/adopter/"+adopterId+"/shelter/"
                                +resShelter._id+"/profile");
                        });
                });

        }

        function updateUser(user) {
            UserService.updateUser(user._id, user);
        }

        function deleteUser() {
            UserService.deleteUser(userId);
        }
        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/project/login");
                    });

        }
    }

})();
