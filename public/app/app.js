var app = angular.module('App', ['ui.router', 'somethingCtrls']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/404');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/views/home.html',

            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/views/userSignup.html',
                controller: 'SignupCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/views/userLogin.html',
                controller: 'LoginCtrl'
            })
            .state('404', {
                url: '/404',
                templateUrl: 'app/views/404.html'
            });

        $locationProvider.html5Mode(true);
    }])
    //4. you should be able to login and be persistent. auth user instead of giving a 404 error
    .config(['$httpProvider', function($httpProvider) {
        //add the AuthInterceptor in the list of interceptors
        //use the interceptor to add on the token from the service factory
        $httpProvider.interceptors.push('AuthInterceptor')
    }]);
