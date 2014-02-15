(function(angular) {
    'use strict';
    angular.module('app.controllers')
        .controller('AdminCtrl',[
            '$scope',
            '$rootScope',
            '$http',
            '$location',
            'Articles',
            function($scope, $rootScope, $http, $location, Articles) {
                $scope.user = $rootScope.user;
                $scope.article = {};
                $scope.archiveMessage = false;
                $scope.formMessage = false;
                $scope.types = [
                    {name: 'Article'},
                    {name: 'Lab'}
                ];
                $scope.submitArticle = function() {
                    Articles.save({
                        title: $scope.article.title,
                        type: $scope.article.type,
                        desc: $scope.article.desc,
                        author: $scope.article.author,
                        body: $scope.article.body
                    })
                        .success(function () {
                            $scope.formMessage = 'Article created successfully';
                        })
                        .error(function () {
                            $scope.formMessage = 'There was an error creating your article'
                        });
                };

                $scope.removeArticle = function (id) {
                    var conf = confirm('Are You Sure You Want To Delete The Article?');
                    if (conf === true) {

                        Articles.remove({id:id}, function() {
                            $scope.archiveMessage = 'Article Deleted';
                        });
                        /*
                        $http.delete('/api/articles/' + id)
                            .success(function() {
                                $location.url('/');
                            });
                        */
                    }
                    else {
                        return false;
                    }
                };

                Articles.query(function(data) {
                    $scope.archives = data;
                });
            }
        ]
    );
}(angular));