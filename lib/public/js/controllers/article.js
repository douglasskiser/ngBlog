(function(angular) {
    'use strict';
    angular.module('app.controllers')
        .controller('ArticleCtrl',[
            '$scope',
            '$routeParams',
            'Articles',
            function($scope, $routeParams, Articles) {
                Articles.get({id:$routeParams.id}, function(data) {
                    console.log(data);
                    $scope.article = data;
                    angular.element(document.querySelector('.article-body')).html(data.body);
                });
            }
        ]
    );
}(angular));