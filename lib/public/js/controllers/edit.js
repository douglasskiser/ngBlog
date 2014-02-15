(function (angular) {
    'use strict';
    angular.module('app.controllers')
        .controller('EditCtrl',[
            '$scope',
            '$routeParams',
            'Articles',
            function($scope, $routeParams, Articles) {
                $scope.article = {};
                $scope.formMessage = false;

                $scope.types = [
                    {name: 'Article'},
                    {name: 'Lab'}
                ];

                Articles.get({id:$routeParams.id}, function (data) {
                    $scope.article = data;
                });

                $scope.editArticle = function () {
                    Articles.update({id:$scope.article._id}, {
                        title: $scope.article.title,
                        author: $scope.article.author,
                        desc: $scope.article.desc,
                        type: $scope.article.type,
                        body: $scope.article.body
                    }, function () {
                        $scope.formMessage = 'Article updated successfully';
                    });
                };
                /*
                $http.get('/api/articles/' + $routeParams.id)
                    .success(function (data) {
                        $scope.article = data;
                    });
                $scope.submit = function() {
                    $http.put('/api/articles/' + $scope.article._id, {
                        title: $scope.article.title,
                        author: $scope.article.author,
                        type: $scope.article.type,
                        body: $scope.article.body
                    })
                        .success(function () {
                            $scope.message = 'Article created successfully';
                            $location.url('/');
                        })
                        .error(function (err) {
                            console.log('Error :', err);
                        });
                };
                */
            }
        ]);
}(angular));