angular.module('demo', ["googleApi"])
    .config(function(googleLoginProvider) {
        googleLoginProvider.configure({
            clientId: '<clientID here>.apps.googleusercontent.com',
            scopes: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/plus.login", "https://www.googleapis.com/auth/gmail.readonly", "https://mail.google.com/"]
        });
    })
    .controller('DemoCtrl', ['$scope', 'googleLogin', 'googleCalendar', 'googlePlus', 'googleMail', function ($scope, googleLogin, googleCalendar, googlePlus, googleMail) {

        $scope.login = function () {
            googleLogin.login();
        };

        $scope.$on("googlePlus:loaded", function() {
          console.log('googlePlus is loaded.');
          googlePlus.getCurrentUser().then(function(user) {
            $scope.currentUser = user;
          });
        })
        $scope.currentUser = googleLogin.currentUser;

        $scope.loadEvents = function() {
            this.calendarItems = googleCalendar.listEvents({calendarId: this.selectedCalendar.id});
            console.log(this.calendarItems);
        }

        $scope.loadCalendars = function() {
            $scope.calendars = googleCalendar.listCalendars();
        }

        $scope.loadMessages = function() {
            console.log($scope.currentUser.emails[0].value);
            this.gMessages = googleMail.listMessages({userId: 'me'});
            console.log(this.gMessages);
        }

    }]);
