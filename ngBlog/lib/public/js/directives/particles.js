(function (angular) {
    'use strict';
    angular.module('app.directives', ['Particle'])
        .directive('particles', function (Particle) {
            return {
                restrict: 'EA',
                scope: {
                    'options': '=options'
                },
                controller: function ($scope, $element, $attrs) {
                    var ctrl = this,
                        defaults = {
                            numberOfParticles: 0,
                            wrap: $element
                        };
                    ctrl.config = angular.extend({}, defaults, $scope.options || {});
                    ctrl.numParticles = 0;

                    ctrl.init = function () {
                        for (var i = 0; i < ctrl.config.numberOfParticles; i++) {
                            var particle = new Particle({
                                id: i,
                                boxSize: {
                                    width: $element[0].offsetWidth,
                                    height: $element[0].offsetHeight
                                },
                                wrap: $element,
                                controller: ctrl
                            }).init();

                            ctrl.numParticles++;
                            $element.append(particle.config.domElement);
                        }
                    };
                    $element.addClass('particle-wrap');
                },
                link: function ($scope, $element, $attrs, ctrl) {
                    ctrl.init();
                }
            }
        });
    angular.module('Particle', [])
        .factory('Particle', function() {
            var Particle = function(config) {
                var
                  $scope = this,
                  maxSize = 200,
                  minSize = 20,
                  maxSpeed = 60,
                  minSpeed = 2,
                  maxOpacity = 0.5,
                  minOpacity = 0.2,
                  maxVector = 360,
                  minVector = 0,
                  maxLife = 20000,
                  minLife = 5000,
                  defaults = {
                      displayed: false,
                      ended: false,
                      size: 0,
                      x: 0,
                      y: 0,
                      speed: 0,
                      opacity: 1,
                      vector: 0,
                      domElement: angular.element(document.createElement('div')).addClass('particle'),
                      id: undefined,
                      boxSize: {width: 0, height: 0},
                      wrap: undefined,
                      controller: undefined
                  };

                $scope.config = angular.extend({}, defaults, config || {});

                var randRange = function(min, max, round) {
                    if(round === undefined) {
                        return Math.floor(Math.random() * (max - min) + min);
                    } else if (round === false) {
                        return Math.random() * (max - min) + min;
                    }
                    return false;
                };

                $scope.init = function() {
                    $scope.config.size = randRange(minSize, maxSize);
                    $scope.config.speed = randRange(minSpeed, maxSpeed);
                    $scope.config.x = randRange(0, $scope.config.boxSize.width);
                    $scope.config.y = randRange(0, $scope.config.boxSize.height);
                    $scope.config.opacity = randRange(minOpacity, maxOpacity, false);
                    if($scope.config.size > 100) {
                        $scope.config.opacity = randRange(0.01, 0.2, false);
                    }
                    $scope.config.blur = $scope.config.size / 8;
                    $scope.config.vector = randRange(minVector, maxVector);
                    $scope.config.xspeed = Math.cos($scope.config.vector) * $scope.config.speed;
                    $scope.config.yspeed = Math.sin($scope.config.vector) * $scope.config.speed;
                    var createTime = new Date().getTime();
                    var expires = new Date().getTime() + randRange(minLife, maxLife);
                    $scope.config.life = expires - createTime;

                    function particleEnd() {
                        if($scope.config.displayed === false) {
                            $scope.config.displayed = true;
                            return;
                        }
                        if($scope.config.ended === false) {
                            $scope.config.domElement.css({
                                transition: 'opacity 1s linear',
                                WebkitTransition: 'opacity 1s linear',
                                MozTransition: 'opacity 1s linear'
                            });
                            var style1 = document.querySelector('style#style-' + $scope.config.id);
                            style1.innerHTML = '.animated-' + $scope.config.id + ' { opacity: 0 !important; transform: translate3d(' + $scope.config.x + 'px, ' + $scope.config.y + 'px, 0px) !important; -webkit-transform: translate3d(' + $scope.config.x + 'px, ' + $scope.config.y + 'px, 0px) !important; -moz-transform: translate3d(' + $scope.config.x + 'px, ' + $scope.config.y + 'px, 0px) !important; }';
                            $scope.config.ended = true;
                            return;
                        }

                        var style = document.querySelector('style#style-' + $scope.config.id);
                        document.getElementsByTagName('head')[0].removeChild(style);
                        $scope.config.ended = true;

                        $scope.config.domElement[0].parentNode.removeChild($scope.config.domElement[0]);

                        var particle = new Particle({
                            id: $scope.config.controller.numParticles,
                            boxSize: {
                                width: $scope.config.wrap[0].offsetWidth,
                                height: $scope.config.wrap[0].offsetHeight
                            },
                            wrap: $scope.config.wrap,
                            controller: $scope.config.controller
                        }).init();

                        $scope.config.controller.numParticles++;
                        $scope.config.wrap.append(particle.config.domElement);
                    }

                    $scope.config.domElement[0].addEventListener('webkitTransitionEnd', particleEnd);
                    $scope.config.domElement[0].addEventListener('transitionend', particleEnd);

                    $scope.updateDOMStyles();

                    $scope.config.x += Math.floor($scope.config.xspeed * $scope.config.life / 1000);
                    $scope.config.y += Math.floor($scope.config.yspeed * $scope.config.life / 1000);

                    $scope.updateXY();

                    return $scope;
                };

                $scope.updateDOMStyles = function() {
                    $scope.config.domElement.css({
                        width: $scope.config.size + 'px',
                        height: $scope.config.size + 'px',
                        borderRadius: $scope.config.size/2 + 'px',
                        webkitFilter: 'blur(' + $scope.config.blur + 'px)',
                        filter: 'blur(' + $scope.config.blur + 'px)',
                        transition: 'transform ' + $scope.config.life/1000 + 's linear, opacity 1s linear',
                        WebkitTransition: '-webkit-transform ' + $scope.config.life/1000 + 's linear, opacity 1s linear',
                        MozTransition: '-moz-transform ' + $scope.config.life/1000 + 's linear, opacity 1s linear',
                        transform: 'translate3d(' + $scope.config.x + 'px, ' + $scope.config.y + 'px, 0px) scale3d(1,1,1)',
                        webkitTransform: 'translate3d(' + $scope.config.x + 'px, ' + $scope.config.y + 'px, 0px) scale3d(1,1,1)',
                        MozTransform: 'translate3d(' + $scope.config.x + 'px, ' + $scope.config.y + 'px, 0px) scale3d(1,1,1)'
                    });
                };

                $scope.updateXY = function() {
                    var className = 'animated-' + $scope.config.id;
                    var style = document.createElement('style');
                    style.type = 'text/css';
                    style.id = 'style-' + $scope.config.id;
                    style.innerHTML = '.' + className + ' { opacity: ' + $scope.config.opacity + ' !important; transform: translate3d(' + $scope.config.x + 'px, ' + $scope.config.y + 'px, 0px) scale3d(1,1,1) !important; -webkit-transform: translate3d(' + $scope.config.x + 'px, ' + $scope.config.y + 'px, 0px) scale3d(1,1,1) !important; -moz-transform: translate3d(' + $scope.config.x + 'px, ' + $scope.config.y + 'px, 0px) scale3d(1,1,1) !important; }';
                    document.getElementsByTagName('head')[0].appendChild(style);
                    setTimeout(function() {
                        $scope.config.domElement.addClass(className);
                    }, 100);
                };

                return $scope;
            };
            return Particle;
        });
}(angular));