(function () {
    angular
        .module("PetAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "createAdopter": createAdopter,
            "createShelter": createShelter,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "createUser":createUser,
        };
        return api;

        function deleteUser(userId) {
            console.log("delete");
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

        function createShelter(userId, user) {
            var url = "/api/shelter/"+userId;
            return $http.post(url, user);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            // /user?username=alice&password=alice
            return $http.get(url);

        }

    }
})();