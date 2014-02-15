(function(angular) {
    'use strict';
    angular.module('app.controllers')
        .controller('LoginCtrl',[
            '$scope',
            '$http',
            '$rootScope',
            '$location',
            function($scope, $http, $rootScope, $location) {
                $scope.user = {};

                $scope.getCssClasses = function(ngModelController) {
                    return {
                        error:
                            ngModelController.$invalid &&
                            ngModelController.$dirty,
                        success:
                            ngModelController.$valid &&
                            ngModelController.$dirty
                    };
                };

                $scope.showError = function(ngModelController, error) {
                    return ngModelController.$error[error];
                };

                $scope.canLogin = function() {
                    return $scope.loginForm.$dirty && $scope.loginForm.$valid;
                };

                $scope.login = function() {
                    $http.post('/login', {
                        username: $scope.user.username,
                        password: $scope.user.password
                    })
                    .success(function(user) {
                        $rootScope.user = user.username;
                        $rootScope.authMessage = 'Authentication successful!';
                        $location.url('/admin');
                    })
                    .error(function() {
                        $rootScope.authMessage = 'Authentication failed.';
                        $location.url('/login');
                    });
                };
            }
        ]
    );
}(angular));