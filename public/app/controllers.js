angular.module('somethingCtrls', ['somethingServices'])
    .controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth) {
        //5.making the logout option appear. return Auth.isLoggedIn() function.
        $scope.isLoggedIn = function() {
            return Auth.isLoggedIn();
        };
        $scope.logout = function() {
            //2. add the service from 1. in next to $scope.
            //call removeToken function from services.
            console.log('logged out');
            Auth.removeToken();
            //return the function
        };
    }])
    //add the dependencies http and location
    .controller('SignupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
        $scope.user = {
            email: '',
            password: ''
        };
        $scope.userSignup = function() {
            //whenever user creates an account. redirects to homepage
            $http.post('/api/users', $scope.user).then(function success(res) {
                console.log('successfully created a new user', res)
                $location.path('/'); //redirects the homepage
            }, function error(res) {
                console.log('error while signing up', res);
            })
        };
    }])
    //add Auth()grabs from services, http, location(redirects to home)
    //8. adding to alerts to our controller we declared from index.html
    //10. adding a timeout to the alerts by define a function
    .controller('LoginCtrl', ['$scope', 'Auth', '$timeout', '$http', '$location', 'Alerts', function($scope, Auth, $timeout, $http, $location, Alerts) {
        $scope.user = {
            email: '',
            password: ''
        };
        //decalred the callback var to set the timeout
        var clearAlerts = function() {
            Alerts.clear();
        }

        $scope.userLogin = function() {
            //because in userlogin.html ng-model is user.name and email. we can pass in whatever the user entered to login
            $http.post('/api/auth', $scope.user).then(function success(res) {
                console.log('response from server when logging in', res);
                Auth.saveToken(res.data.token);
                Alerts.add('success', 'you are now logged in') //adding succes alert
                $timeout(clearAlerts, 1000) //clearing the alerts after 1 sec
                $location.path('/'); //redirects
            }, function error(res) {
                console.log('something went wrong', res);
                Alerts.add('error', 'Bad login info, please try again') //adding error alerts
                $timeout(clearAlerts, 1000) //clears the alert after 1 sec
            });
        };
    }])
    //6. being adding alerts. we will have to add ng-controller into index.html
    .controller('AlertsController', ['$scope', 'Alerts', function($scope, Alerts) {
        //when we make our alerts factory. we'll make a get function. so in here we will return the get() function. returns an array of alerts
        $scope.alerts = function() {
            return Alerts.get();
        }
    }]);
