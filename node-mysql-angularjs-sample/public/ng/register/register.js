var myApp = angular.module('myApp', [
    , 'ngRoute'
    , 'myControllers'
    , 'dataFactory'
]);



myApp.config(function ($routeProvider) {
    $routeProvider.
    when('/', {
            templateUrl: '/ng/views/home.html',
            controller: 'homeController'
        }).
    when('/contacts', {
            templateUrl: '/ng/views/contacts.html',
            controller: 'contactsController'
        }).
    when('/contacts/:id', {
            templateUrl: '/ng/views/contactsedit.html',
            controller: 'contactsController'
        }).

    when('/about', {
            templateUrl: '/ng/views/home.html',
            controller: 'homeController'
        }).
    otherwise({
            redirectTo: '/'
        });
});