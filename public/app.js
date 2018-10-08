var chatApp = angular.module('chatApp', ['ngRoute','btford.socket-io']);
//var chatApp = angular.module('MySocektApp', ['ngMaterial', 'LocalStorageModule', 'btford.socket-io']);
chatApp.config(function($routeProvider) {
    $routeProvider

       
        .when('/', {
            templateUrl : 'views/login.html',
            controller  : 'loginControlller'
        })
      // route for the login  page
        // .when('/login', {
        //     templateUrl : 'views/login.html',
        //     controller  : 'loginControlller'
        // })

        // route for the signApp page
        .when('/signup', {
            templateUrl : 'views/signup.html',
            controller  : 'signupController'
        })
        .when('/forgot', {
            templateUrl : 'views/forgot.html',
            controller  : 'forgotController'
        })
        .when('/text', {
            templateUrl : 'views/text.html',
            controller  : 'textController'
        })
        
        .when('/dashboard', {
            templateUrl : 'views/dash.html',
            controller  : 'dashController'
        })   
        .when('/dashboard/personalMessage', {

            templateUrl: 'views/personalMessg.html',
            controller: 'personalMessgControl'
        }) 
});
chatApp.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:3013')
    });
}]);