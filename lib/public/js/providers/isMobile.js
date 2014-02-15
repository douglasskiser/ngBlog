(function (angular) {
    'use strict';
    angular.module('app.providers')
        .factory('isMobile', function() {
            var devices = {};

            devices.android = function () {
                return navigator.userAgent.match(/Android/i);
            };

            devices.blackberry = function () {
                return navigator.userAgent.match(/BlackBerry/i);
            };

            devices.ios = function () {
                return navigator.userAgent.match(/iPhone|iPod|iPad/i);
            };

            devices.opera = function () {
                return navigator.userAgent.match(/Opera Mini/i);
            };

            devices.windows = function () {
                return navigator.userAgent.match(/IEMobile/i);
            };

            devices.sevenInch = function () {
                return navigator.userAgent.match(new RegExp('(?:Nexus 7|BNTV250|KindleFire|Silk|GT-P1000)', 'i'));
            };

            var handle = function(devices) {
                return (devices === null) ? false : true;
            };

            var isMobile = function () {
                var d = (devices.android() || devices.blackberry() || devices.ios() || devices.opera() || devices.windows() || devices.sevenInch());
                return handle(d);
            };


            return isMobile;
        });
}(angular));