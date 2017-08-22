(function () {
    angular
        .module("PetAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": login,
            "findUserById": findUserById,
            "createAdopter": createAdopter,
            "createShelter": createShelter,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "createUser":createUser,
            "findDetail": findDetail,
            "login": login,
            "logout": logout,
            "register":register,
            "checkLogin":checkLogin,
            "getAllUsers":getAllUsers,
        };
        return api;


        function getAllUsers() {
            var url = "/api/users/all";
            return $http.get(url);
        }

        function register(user) {
            var url = "/api/register";
            return $http.post(url,user);

        }
        function checkLogin() {
            var url = "/api/checkLogin";
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function findDetail(userId) {
            var url = "/api/user"
        }
        function deleteUser(userId) {
            var url = "/api/user/"+userId;
            return $http.delete(url);
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user);
        }

        function createAdopter(user) {
            var url = "/api/adopter";
            return $http.post(url, user);
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        function createShelter(shelter) {
            var url = "/api/shelter";
            return $http.post(url, shelter);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function login(username, password) {
            var url = "/api/login";
            return $http.post(url,{username:username, password:password});
        }

        function logout(user) {
            return $http.post("/api/logout");
        }

    }
})();