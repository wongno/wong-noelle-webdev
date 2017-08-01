(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        var api = {
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "createUser": createUser,
            "updateUser": updateUser
        };
        return api;

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user);
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        function findUserByUsername(username) {
            console.log("findUserByUsername");
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        function findUserById(userId) {
            console.log("findUserById");
            return $http.get("/api/user/"+userId);
        }

        function findUserByCredentials(username, password) {
            console.log("findUserByUsernameAndPassword");
            //var url = "/api/user/";
           var url = "/api/user?username="+username+"&password="+password;
            // /user?username=alice&password=alice
            return $http.get(url);

        }

    }
})();
//         var api = {
//             "findUserByUsername": findUserByUsername,
//             "findUserByCredentials": findUserByCredentials,
//             "findUserById": findUserById,
//             "createUser": createUser,
//             "updateUser": updateUser,
//             "returnUsers": returnUsers,
//             "deleteUser": deleteUser,
//         };
//         return api;
//
//         function deleteUser(userId) {
//             for(var u in users) {
//                 if(users[u]._id === userId) {
//                     if (u > -1) {
//                         users.splice(u, 1);
//                         return;
//                     }
//                 }
//             }
//             return null;
//         }
//
//         function updateUser(userId, user) {
//             var url = "/api/user/" + userId;
//             return $http.put(url,user);
//         }
//
//         function createUser(user) {
//             var url = "/api/user";
//             return $http.post(url, user);
//         }
//
//         function findUserByUsername(username) {
//             var url = "/api/user?username="+username;
//             return $http.get(url);
//         }
//
//         function findUserById(userId) {
//             var url = "/api/user/" + userId;
//             return $http.get(url);
//         }
//
//         function findUserByCredentials(username, password) {
//             console.log("findUserByCredentials");
//             var url = "/api/user?"+"username="+username+"&password="+password;
//             console.log(url);
//             return $http.get(url);
//         }
//
//         function returnUsers(){
//             return users;
//         }
//
//     }
// })();