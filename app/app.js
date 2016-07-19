'use strict';

var app = angular.module('mirrorApp', ['ui.router', 'angular-loading-bar','ngGeolocation', 'angularXml2json']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/dashboard");

    $stateProvider.state("dashboard", {
        url: "/dashboard",
        templateUrl: "app/views/dashboard.html"
    });

}]);

app.service('mirrorService', function($http){


    this.getMeteo = function (coord) {
        return $http({
            method: 'GET',
            url: 'http://www.prevision-meteo.ch/services/json/'+ coord
        })
    };

/*    this.getMap = function(){
        return $http({
            method: 'GET',
            url: 'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d44995.41974607925!2d5.7897585!3d45.1827695!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr!4v1456512436577'
        })
    };*/

    this.getFluxRss = function(rubrique){
        return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(rubrique));
    };


    this.getFluxRssCinema = function(cinema){
        return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(cinema));
    };

    this.getcal = function(key){
        return $http({
            method : get,
            url : 'https://www.googleapis.com/calendar/v3/users/me/calendarList/primary?key='+ key
        })
    }

    
});



app.config(['$logProvider','$httpProvider', 'cfpLoadingBarProvider', function ($logProvider, $httpProvider, cfpLoadingBarProvider) {
    $logProvider.debugEnabled(true);
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.includeBar = false;

}]);