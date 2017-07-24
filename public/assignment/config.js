(function () {

    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile/:userId", {
                templateUrl: "user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            // website routes
            .when("/user/:userId/website", {
                templateUrl: "website/templates/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/new", {
                templateUrl: "website/templates/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model"
            })
            // .when("/user/:userId/website/edit", {
            //     templateUrl: "website/templates/website-edit.view.client.html",
            //     controller: "websiteListController",
            //     controllerAs: "model"
            // })
    }
})();