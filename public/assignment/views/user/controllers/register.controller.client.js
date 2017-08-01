(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var model = this;

        model.registerUser = registerUser;

        function init() {

        }
        init();


        function registerUser(user) {
            if (!user) {
                model.errorMessage = "Please enter information"
                return;
            }
            UserService.findUserByUsername(user.username)
                .then(function (response) {
                    var responseuser = response.data;
                    console.log(responseuser + "");
                    if(responseuser === "0") {
                        if(user.password === user.password2){
                            console.log(user.username+"register1");
                            return UserService.createUser(user);
                        }else{
                            model.errorMessage = "Passwords don't match";
                            return;
                        }

                    } else {
                        console.log(user.username+"register2");
                        model.errorMessage = "User already exists";
                        return;
                    }
                    return;
                })
                .then(function (response) {
                    responseuser = response.data;
                    $location.url("/profile/" + responseuser._id);
                });
                // .then(function (response) {
                //     responseuser = response.data;
                //     if (responseuser === "0") {
                //         console.log(user.username+"register3");
                //         return UserService.createUser(user)
                //             .then(function(response){
                //                 user = response.data;
                //                 $location.url("/user/" + user._id);
                //                 return; });
                //     } else {
                //         model.errorMessage = "username already exist";
                //     }
                //     return;
                // });
        }
    }
})();
            // if (!user) {
            //     model.errorMessage = "Please enter information"
            //     return;
            // }
            // if (user.password === user.password2) {
            //     var promise = UserService.findUserByUsername(user.username);
            //     promise
            //         .then(function(response){
            //             var _user = response.data;
            //             if (!_user) {
            //             var user = UserService.createUser(user);
            //             $location.url("/profile/" + user._id);
            //             model.errorMessage = UserService.returnUsers();
            //         } else {
            //             model.errorMessage = "User already exists";
            //             model.errorMessage = UserService.returnUsers();
            //         }});
            // } else {
            //     model.errorMessage = "Passwords don't match";
            // }
       // }

