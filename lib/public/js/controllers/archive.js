(function(angular) {
    'use strict';
    angular.module('app.controllers')
        .controller('ArchiveCtrl', [
            '$scope',
            '$location',
            'Articles',
            function($scope, $location, Articles) {
                Articles.query(function(data) {
                    $scope.archives = data.reverse();
                });
                $scope.getArticle = function(id) {
                    $location.path('article/' + id);
                };
            }
        ]
    );
}(angular));