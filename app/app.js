'use strict';

var app = angular.module('miroirApp', ['ui.router', 'ngMaterial', 'ngAnimate', 'angular-loading-bar']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/dashboard");

    $stateProvider.state("dashboard", {
        url: "/dashboard",
        templateUrl: "app/views/dashboard.html"
    });

}]);




app.config(['$mdThemingProvider', function ($mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('blue');
}]);

app.config(['$logProvider', function ($logProvider) {
    $logProvider.debugEnabled(true);
}]);

