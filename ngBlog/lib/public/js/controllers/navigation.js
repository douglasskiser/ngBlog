(function(angular) {
    'use strict';
    angular.module('app.controllers')
        .controller('NavigationCtrl', [
            '$scope',
            function($scope) {
                $scope.isCollapsed = true;
                $scope.toggleNav = function() {
                    $scope.isCollapsed = !$scope.isCollapsed;
                };
            }
        ]);
}(angular));