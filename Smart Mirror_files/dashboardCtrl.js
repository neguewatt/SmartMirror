'use strict';
app.controller('dashboardCtrl', ['$scope', '$log', '$timeout', '$interval', '$geolocation', 'mirrorService', 'ngXml2json',

    function ($scope, $log, $timeout, $interval, $geolocation, mirrorService, ngXml2json) {

    //<---------------------------------------------------------->
    // INIT

        $scope.todos = [];
        $scope.init = function(){

            $scope.showMeteo();
            $scope.jtRss();
            /*$scope.showMap();*/
           /* $scope.checkAuth();*/
            /*$scope.calendar();*/
        };


        //<---------------------------------------------------------->
        //Reco vocal

        /*var myListe;
        var commands =
        {
            'ajouter *liste':function(liste){
                myListe = liste;
                $log.error(liste);
                $scope.todos.push({text: myListe, done:false});
            }
        };

        annyang.debug();
        annyang.addCommands(commands);
        annyang.setLanguage('fr-FR');
        annyang.start();*/


    //<---------------------------------------------------------->
    // appel de la valeur de l'heure


        $interval(function(){
            if(moment().format('H') > 19 && moment().format('H') < 5){
                $scope.hello = 'Bonsoir,';
            } else if(moment().format('H') > 5){
                $scope.hello = 'Bonne journée,';
            }
        },1000);



    //<---------------------------------------------------------->
    //DATE
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
    $scope.time = moment().format('H:mm');


    $interval(function(){
        $scope.time = moment().format('H:mm');

    },1000);



    //<---------------------------------------------------------->
    //TODOLIST

        $scope.clearCompleted = function () {
            $scope.todos = _.filter($scope.todos, function(todo){
                return !todo.done;
            });
        };

    //<---------------------------------------------------------->
    // Flux RSS le monde

        var rubrique = 'rss/une.xml';
        var rubrique2 = 'ingenieurs-sciences/rss_full.xml';

        $scope.jtRss = function(){
            mirrorService.getFluxRss(rubrique).then(function(res){
                $log.debug(res.data.responseData.feed);
                $scope.fluxRss = res.data.responseData.feed;
            })
        };

/*
        $scope.test = function(){
            var res = 'http://www.lemonde.fr/rss/une.xml';
            $scope.tes = ngXml2json.parser(res.data);
            $log.debug($scope.tes);
        }
*/

        $scope.video = 'http://192.168.1.16/?action=stream';


        //<---------------------------------------------------------->
        //Géoloc & weather

        $scope.showMeteo = function() {
            $geolocation.getCurrentPosition({
                timeout: 10000
            }).then(function (position) {
                $scope.myPosition = position;
                $scope.lat = position.coords.latitude;
                $scope.long = position.coords.longitude;
                $interval(function () {
                    var coordonee = 'lat=' + $scope.lat.toFixed(3) + 'lng=' + $scope.long.toFixed(3);
                    mirrorService.getMeteo(coordonee)
                        .success(function (data) {
                            $scope.weather = data;
                        })
                }, 1000)

            });
        }


    //<---------------------------------------------------------->
    // calendar

        /*$scope.events = {};

        // Your Client ID can be retrieved from your project in the Google
        // Developer Console, https://console.developers.google.com
        var CLIENT_ID = '796856605759-p36pkc95rsqfgigekuqa3t149fomr4ed.apps.googleusercontent.com';
        var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

        /!**
         * Check if current user has authorized this application.
         *!/
        $scope.checkAuth = function () {
            console.log("checkAuth");
            gapi.auth.authorize(
                {client_id: CLIENT_ID, scope: SCOPES, immediate: true},
                handleAuthResult);
            console.log("checkAuthPass");
        }

        /!**
         * Handle response from authorization server.
         *
         * @param {Object} authResult Authorization result.
         *!/
        function handleAuthResult(authResult) {
            console.log("handleAuthResult");
                loadCalendarApi();
        }


        /!**
         * Load Google Calendar client library. List upcoming events
         * once client library is loaded.
         *!/
        function loadCalendarApi() {
            console.log("test1")
            gapi.client.load('calendar', 'v3', listUpcomingEvents);
        }

        /!**
         * Print the summary and start datetime/date of the next ten events in
         * the authorized user's calendar. If no events are found an
         * appropriate message is printed.
         *!/
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
                    /!*console.log(resp);*!/
                },1000);
            });
        }*/

/*        $scope.calendar = function(key){
            mirrorService.getcal(key).then(function(rest){
                var key = 'AIzaSyAYFfE8n0Cg5mFMWXVCE8bPOjawD9x7bJw';
                /!*calEvent$scope.calEvent = rest;*!/
                $log.debug(rest);
            })
        }*/



    //<---------------------------------------------------------->
    // Map

        $scope.showMap = function(){
            mirrorService.getMap().then(function(res){
                $log.debug(res.data);
                //$scope.map = res;
            });
        };







}]);
