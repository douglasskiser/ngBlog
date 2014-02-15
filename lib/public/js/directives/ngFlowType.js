(function (angular) {
    'use strict';
    angular.module('app.directives')
        .directive('flowType', function ($window) {
            return {
                restrict: 'A',
                scope: {
                    'userOptions': '=options'
                },
                controller: function ($scope) {
                    var ctrl = this,
                        defaults = {
                            maximum: 9999,
                            minimum: 1,
                            maxFont: 9999,
                            minFont: 1,
                            fontRatio: 35,
                            lineRatio: 1.45
                        };
                    ctrl.options = angular.extend({}, defaults, $scope.userOptions || {});
                },
                link: function ($scope, $element, $attrs, ctrl) {
                    var changes = function (el) {
                        var elWidth = el.offsetWidth,
                            width = elWidth > ctrl.options.maximum ? ctrl.options.maximum : elWidth < ctrl.options.minimum ? ctrl.options.minimum : elWidth,
                            fontBase = width / ctrl.options.fontRatio,
                            fontSize = fontBase > ctrl.options.maxFont ? ctrl.options.maxFont : fontBase < ctrl.options.minFont ? ctrl.options.minFont : fontBase;

                        angular.element(el).css({
                            'font-size': fontSize + 'px',
                            'line-height' : fontSize * ctrl.options.lineRatio + 'px'
                        });

                    };
                    changes($element[0]);
                    $window.onresize = function () {
                        changes($element[0]);
                    };
                }
            }
        }
    );
}(angular));