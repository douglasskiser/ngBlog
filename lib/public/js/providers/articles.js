(function(angular) {
    'use strict';
    angular.module('app.providers', [
            'ngResource'
        ])
        .factory('Articles', [
            '$resource',
            function($resource) {
                return $resource('/api/articles/:id',
                    {
                        id: '@id'
                    },
                    {
                        'update': {method: 'PUT'}
                    }
                );
            }
        ]
    );
}(angular));