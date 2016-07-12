'use strict';

var app = angular.module('mirrorApp', ['ui.router', 'angular-loading-bar','ngGeolocation']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/dashboard");

    $stateProvider.state("dashboard", {
        url: "/dashboard",
        templateUrl: "app/views/dashboard.html"
    });

}]);

app.service('mirrorService', function($http){

    delete $http.defaults.headers.common['X-Requested-With'];

    this.getMeteo = function (coord) {
        return $http({
            method: 'GET',
            url: 'http://www.prevision-meteo.ch/services/json/'+ coord
        })
    };

    this.getMap = function(){
        return $http({
            method: 'GET',
            url: 'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d44995.41974607925!2d5.7897585!3d45.1827695!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr!4v1456512436577'
        })
    };


/*    this.getcal = function(key){
        return $http({
            method : get,
            url : 'https://www.googleapis.com/calendar/v3/users/me/calendarList/primary?key='+ key
        })
    }*/

    
});



app.config(['$logProvider', function ($logProvider) {
    $logProvider.debugEnabled(true);
}]);

