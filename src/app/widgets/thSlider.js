'use strict';
/**
 * app.widget Module
 *
 * Build a full back slider background
 */
angular
  .module('app.widgets')
  .directive('thBackSlider', ['$timeout', function($timeout){

    return {
      scope: {
        slides :'=thSource',
        options : '=thOptions'
      },
      templateUrl: 'app/widgets/thSlider.html',
      transclude: true,
      restrict: 'AE',
      replace: true,
      link: function(scope, element) {
        var superslides = null,
          defaults = {
            'slide_easing': 'easeInOutCubic',
            'slide_speed': 800,
            'pagination': true,
            'scrollable': true
          };

        if (!_.isEmpty(scope.options)) {
          angular.extend(defaults, scope.options);
        }

        scope.$watch('slides', function(newVal) {
          if ( !( _.isUndefined(newVal) || _.isNull(newVal)) ) {
            $timeout(function() {
              superslides = element.superslides(defaults);
            },500);
          }
        });
      }
    };
  }]);
