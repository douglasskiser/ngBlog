(function(angular) {
    'use strict';
    angular.module('app.controllers')
        .controller('RegisterCtrl',[
            '$scope',
            '$http',
            '$location',
            '$log',
            function($scope, $http, $location, $log) {
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

                $scope.canRegister = function() {
                    return $scope.registerForm.$dirty && $scope.registerForm.$valid;
                };

                $scope.register = function() {
                    $http.post('/register', {
                        username: $scope.user.username,
                        password: $scope.user.password
                    })
                    .success(function() {
                        $location.url('/');
                    })
                    .error(function(error) {
                        $log.error('Error registering user:', error);
                    });
            };
        }]
    );
}(angular));