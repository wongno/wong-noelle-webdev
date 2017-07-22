var app = angular.module("WamApp",["ngRoute"]);
app.controller("loginController", loginController);

app.config(configuration);

function configuration($routeProvider) {
    $routeProvider
        .when("/login", {
        templateURL: "user/templates/login.view.client.html"
        })
        .when("/register", {
        templateURL: "user/templates/register.view.client.html"
        })
        .when("/profile/:userID", {
            templateURL: "user/templates/profile.view.client.html"
        })
    
}

function loginController($scope) {
    
}
