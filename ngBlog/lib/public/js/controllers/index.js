(function(angular) {
    'use strict';
    angular.module('app.controllers')
        .controller('IndexCtrl', [
            '$scope',
            '$location',
            '$log',
            'Articles',
            'isMobile',
            function($scope, $location, $log, Articles, isMobile) {
                $scope.isMobile = isMobile();

                $scope.options = {
                    numberOfParticles: 25
                };
                $scope.getArticle = function(id) {
                    $location.path('/article/' + id);
                };

                Articles.query(function(data) {
                    $scope.articles = data;
                });
            }
        ]
    );
}(angular));