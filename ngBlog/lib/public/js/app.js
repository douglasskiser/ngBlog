(function(angular) {
    'use strict';
    angular.module('app', [
        'ngRoute',
        'ngAnimate',
        'ui.bootstrap',
        'app.controllers',
        'app.directives',
        'app.providers'
    ])
    .config(function ($routeProvider, $httpProvider, $locationProvider) {
        var loggedin = function($q, $timeout, $http, $location, $rootScope) {
            var defered = $q.defer();
            $http.get('/loggedin')
                .success(function(user) {
                    if (user != '0') {
                        $timeout(defered.resolve, 0);
                    }
                    else {
                        $rootScope.authMessage = 'You need to log in';
                        $timeout(function() {
                            defered.reject();
                        }, 0);
                        $location.url('/login');
                    }
                });
            return defered.promise;
        };

        $httpProvider.responseInterceptors.push(function($q, $location) {
            return function(promise) {
                return promise.then(
                    function(response) {
                        return response;
                    },
                    function(response) {
                        if (response.status === 401) {
                            $location.url('/login');
                        }
                        return $q.reject(response);
                    }
                );
            }
        });

        $routeProvider
            .when('/', {
                templateUrl: 'partials/index',
                controller: 'IndexCtrl'
            })
            .when('/register', {
                templateUrl: 'partials/register',
                controller: 'RegisterCtrl'
            })
            .when('/login', {
                templateUrl: 'partials/login',
                controller: 'LoginCtrl'
            })
            .when('/admin', {
                templateUrl: 'partials/admin',
                controller: 'AdminCtrl',
                resolve: {
                    loggedin : loggedin
                }
            })
            .when('/article/:id', {
                templateUrl: 'partials/article',
                controller: 'ArticleCtrl'
            })
            .when('/article/:id/edit', {
                templateUrl: 'partials/edit',
                controller: 'EditCtrl',
                resolve: {
                    loggedin : loggedin
                }
            })
            .when('/archive', {
                templateUrl: 'partials/archive',
                controller: 'ArchiveCtrl'
            })
            .when('/contact', {
                templateUrl: 'partials/contact',
                controller: 'ContactCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });


        //$locationProvider.html5Mode(true);
        $locationProvider.html5Mode(true).hashPrefix('!');
    })
    .run(function($rootScope, $http, $log) {
        $rootScope.authMessage = '';
        $rootScope.user = '';
        $rootScope.logout = function() {
            $http.post('/logout')
                .success(function() {
                    $rootScope.authMessage = 'Logged out';
                })
                .error(function(error) {
                    $log.error('Error logging out:', error);
                    $rootScope.authMessage = 'Error logging out';
                });
        };
    });
}(angular));