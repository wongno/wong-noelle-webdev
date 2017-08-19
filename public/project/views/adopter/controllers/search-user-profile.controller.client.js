(function () {
    angular
        .module("PetAppMaker")
        .controller("SearchUserController", SearchUserController);

    function SearchUserController(ShelterService,AdopterService,$routeParams, AnimalSearchService,
                                      UserService, $location,PetService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.adopterId = $routeParams.adopterId;
        var username = $routeParams["username"];
        model.searchUsersByUsername =searchUsersByUsername;
        function init() {
            UserService.findUserById(model.userId)
                .then(function (response) {
                    console.log(response);
                    model.user = response.data;
                });
            AdopterService
                .findAdopterById(model.adopterId)
                .then(function (response) {
                    model.adopter = response.data;
                });
            UserService
                .findUserByUsername(username)
                .then(function (response) {
                    model.searchUser = response.data;
                    return model.searchUser;
                })

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
            model.user.following.push(model.foundUser._id);
            UserService
                .updateUser(userId, model.user)
                .then(function () {
                    $location.url("/user/" + userId + "/adopter/" + adopterId+"/profile/"+model.foundUser.username);
                })
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
