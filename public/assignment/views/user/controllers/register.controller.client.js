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
                model.errorMessage = "Please enter information";
                return;
            }
                UserService.findUserByUsername(user.username)
                    .then(function (response) {
                        var _user = response.data;
                        if(_user === null) {
                            return UserService.createUser(user);
                        } else {
                            model.errorMessage = "User already exists";
                        }
                    })
                    .then(function (response) {
                       var _user = response.data;
                       if(_user){
                           $location.url("/profile/" + _user._id);
                       }
                    });

            // UserService.findUserByUsername(user.username)
            //     .then(function (response) {
            //         var responseuser = response.data;
            //         console.log(responseuser + "");
            //        // if(responseuser === "0") {
            //             if(user.password === user.password2){
            //                 console.log(user.username+"register1");
            //                 return UserService.createUser(user);
            //             }else{
            //                 model.errorMessage = "Passwords don't match";
            //                 return;
            //             }
            //
            //         // } else {
            //         //     console.log(user.username+"register2");
            //         //     model.errorMessage = "User already exists";
            //         //     return;
            //         // }
            //        // return;
            //     })
            //     .then(function (response) {
            //         user = response.data;
            //         $location.url("/profile/" + user._id);
            //     });
        }
    }
})();

