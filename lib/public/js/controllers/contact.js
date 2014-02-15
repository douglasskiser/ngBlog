(function(angular) {
    'use strict';
    angular.module('app.controllers')
        .controller('ContactCtrl',[
            '$scope',
            '$http',
            function($scope, $http) {
                $scope.contact = {};
                $scope.formMessage = false;
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

                $scope.canSend = function() {
                    return $scope.contactForm.$dirty && $scope.contactForm.$valid;
                };

                $scope.send = function() {
                    $http.post('/contact', {
                        name: $scope.contact.name,
                        email: $scope.contact.email,
                        message: $scope.contact.message
                    })
                    .success(function() {
                        $scope.formMessage = 'Your message was sent successfully';
                        $scope.contact = {};
                    })
                    .error(function() {
                        $scope.formMessage = 'There was an error sending your message';
                    });
                };
            }
        ]
    );
}(angular));