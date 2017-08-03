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
        }
    }
})();

