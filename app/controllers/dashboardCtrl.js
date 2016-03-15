'use strict';
app.controller('dashboardCtrl', ['$scope', '$log', '$timeout', '$interval','$http', '$geolocation',

    function ($scope, $log, $timeout, $interval, $http, $geolocation) {

    //<---------------------------------------------------------->
    //NAME

    $scope.hello = "";
    $scope.name = "David";
    $scope.user = {};

// appel de la valeur de l'heure


        $interval(function(){
            if(moment().format('H') > 19){
                $scope.hello = 'Bonsoir,';
            } else if(moment().format('H') > 5){
                $scope.hello = 'Bonne journée,';
            }
        },1000);

    //<---------------------------------------------------------->
    //angular material



    //<---------------------------------------------------------->
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

    $scope.dateNumber = moment().format('DD');
    $scope.dateDay = moment().format('dddd');
    $scope.dates = moment().format('dddd, D MMMM');
    $scope.time = moment().format('H:mm:ss');


    $interval(function(){
        $scope.time = moment().format('H:mm:ss');

    },1000);





    //<---------------------------------------------------------->
    //Géoloc

    $geolocation.getCurrentPosition({
        timeout: 60000
    }).then(function(position) {
        $scope.myPosition = position;
        $log.error(position.coords);
    });



    //<---------------------------------------------------------->
    //Weather

        var test = 'lat=46.259lng=5.235';
        //$scope.meteo = {};

        $http({
            method: 'GET',
            url: 'http://www.prevision-meteo.ch/services/json/'+test
        })
            .success(function (data) {
                $interval(function(){
                    $scope.weatherURL = data.current_condition.icon;
                    $scope.weatherCondition = data.current_condition.condition;
                    //$log.error(data);
                    $scope.tempNow = data.current_condition.tmp;
                },1000);

            })
            .error(function (data) {
                $log.error('pas trouve')
            });






    //<---------------------------------------------------------->
    // calendar

        $scope.events = {};

        // Your Client ID can be retrieved from your project in the Google
        // Developer Console, https://console.developers.google.com
        var CLIENT_ID = '512876165470-mc7n04ji7gaht9r6ng8d0nah1i5i5g30.apps.googleusercontent.com';
        var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

        /**
         * Check if current user has authorized this application.
         */
        $scope.checkAuth = function () {
            console.log("checkAuth");
            gapi.auth.authorize(
                {client_id: CLIENT_ID, scope: SCOPES, immediate: true},
                handleAuthResult);
            console.log("checkAuthPass");
        }

        /**
         * Handle response from authorization server.
         *
         * @param {Object} authResult Authorization result.
         */
        function handleAuthResult(authResult) {
            console.log("handleAuthResult");
                loadCalendarApi();
        }


        /**
         * Load Google Calendar client library. List upcoming events
         * once client library is loaded.
         */
        function loadCalendarApi() {
            console.log("test1")
            gapi.client.load('calendar', 'v3', listUpcomingEvents);
        }

        /**
         * Print the summary and start datetime/date of the next ten events in
         * the authorized user's calendar. If no events are found an
         * appropriate message is printed.
         */
        function listUpcomingEvents() {
            var request = gapi.client.calendar.events.list({
                'calendarId': 'primary',
                'timeMin': (new Date()).toISOString(),
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': 3,
                'orderBy': 'startTime'
            });

            request.execute(function(resp) {
                $interval(function(){
                    $scope.events = resp.items;
                    console.log(resp);
                },1000);
            });
        }






        //<---------------------------------------------------------->
    // Mail




    //<---------------------------------------------------------->
    // Map

        $scope.src = "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d44995.41974607925!2d5.7897585!3d45.1827695!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr!4v1456512436577"

        //<---------------------------------------------------------->
        //Reco vocal

        /*var commands =
        {
            'bonjour': function () {
                $log.error('salut humain')
            },
            'mon nom est *nom':function(nom){
                $scope.user.name = nom;
                $log.error('ok');
            },
            'je vis à *ville':function(ville){
                var meteo = ville;
                $log.error(ville);
            }
        }

        annyang.debug();
        annyang.addCommands(commands);
        annyang.setLanguage('fr-FR');
        annyang.start();*/

}]);
