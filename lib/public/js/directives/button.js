(function(angular) {
    'use strict';
    angular.module('app.directives')
        .directive('button', function() {
            return {
                restrict: 'E',
                compile: function(element, attrs) {
                    element.addClass('btn');
                    if (attrs.type === 'submit') {
                        element.addClass('btn-primary');
                    }
                    if (attrs.btnType === 'default') {
                        element.addClass('btn-default');
                    }
                    if (attrs.size) {
                        element.addClass('btn-' + attrs.size);
                    }
                    if (attrs.icon) {
                        element.addClass(attrs.icon);
                    }
                }
            };
        });
}(angular));