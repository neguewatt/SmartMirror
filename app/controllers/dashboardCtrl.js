'use strict';
app.controller('dashboardCtrl', ['$scope', '$log', '$timeout', '$interval','$http', function ($scope, $log, $timeout, $interval, $http) {

        //NAME
    $scope.name = "David";
    //angular material
    $scope.isOpen = false;
    $scope.selectedMode = 'md-fling';
    $scope.selectedDirection = 'right';


    //DATE ET HEURE
    moment.locale('fr', {
        months : "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
        monthsShort : "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
        weekdays : "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
        weekdaysShort : "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        weekdaysMin : "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            LTS : "HH:mm:ss",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd D MMMM YYYY LT"
        },
        calendar : {
            sameDay: "[Aujourd'hui à] LT",
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : "dans %s",
            past : "il y a %s",
            s : "quelques secondes",
            m : "une minute",
            mm : "%d minutes",
            h : "une heure",
            hh : "%d heures",
            d : "un jour",
            dd : "%d jours",
            M : "un mois",
            MM : "%d mois",
            y : "une année",
            yy : "%d années"
        },
        ordinalParse : /\d{1,2}(er|ème)/,
        ordinal : function (number) {
            return number + (number === 1 ? 'er' : 'ème');
        },
        meridiemParse: /PD|MD/,
        isPM: function (input) {
            return input.charAt(0) === 'M';
        },
        // in case the meridiem units are not separated around 12, then implement
        // this function (look at locale/id.js for an example)
        // meridiemHour : function (hour, meridiem) {
        //     return /* 0-23 hour, given meridiem token and hour 1-12 */
        // },
        meridiem : function (hours, minutes, isLower) {
            return hours < 12 ? 'PD' : 'MD';
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    var time = moment().format('LT');
    var date = moment().format('dddd DD MMMM YYYY');
    $scope.dateNumber = moment().format('DD');
    $scope.dateDay = moment().format('dddd');

//    $scope.horloges = time;
    $scope.dates = date;



    function update() {
      $('#clock').html(moment().format('H:mm'));
    }

    setInterval(update, 1000);


    //<---------------------------------------------------------->

    //Géoloc

    var lat = "";
    var lng = "";


    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    else
        alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");

    function successCallback(position){
        $log.error("Latitude : " + position.coords.latitude + ", longitude : " + position.coords.longitude);
//        var lat = position.coords.latitude;
//        var lng = position.coords.longitude;
//        $log.error(lat.toFixed(3)+','+lng.toFixed(3))
//        var test = 'lat='+lat.toFixed(3)+'lng='+lng.toFixed(3);
//        $log.error(test);
    };

    function errorCallback(error){
        switch(error.code){
            case error.PERMISSION_DENIED:
                alert("L'utilisateur n'a pas autorisé l'accès à sa position");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("L'emplacement de l'utilisateur n'a pas pu être déterminé");
                break;
            case error.TIMEOUT:
                alert("Le service n'a pas répondu à temps");
                break;
            }
    };

    //<---------------------------------------------------------->

    //Weather

    var nomVille = "gieres";

        $.getJSON('http://www.prevision-meteo.ch/services/json/gieres',
    function(data){
//        $log.error(data);
        $scope.tempNow = data.current_condition.tmp;
        $scope.weatherCondition = data.current_condition.condition;
        $scope.weatherURL = data.current_condition.icon;
    });

    //<---------------------------------------------------------->
    // calendar

//    CalendarService.getCalendarEvents().then(function(response) {
//        $log.error(response);
//        $scope.calendar = CalendarService.getFutureEvents();
//    }, function(error) {
//        $log.error(error);
//    });
    // Simple GET request example:


//    $http({
//      method: 'GET',
//      url: 'agenda.html'
//    }).then(function successCallback(response) {
//        // this callback will be called asynchronously
//        // when the response is available
//        $scope.calendar = response.textContent;
//
//      }, function errorCallback(response) {
//        // called asynchronously if an error occurs
//        // or server returns response with an error status.
//      });


    $scope.calendar =


    //<---------------------------------------------------------->
    // Mail



}]);
