'use strict';
/**
* app.directives Module
*
* Build a full back slider background
*/
angular.module('app.directives')
.directive('thBackSlider', ['$timeout', function($timeout){

  return {
    scope: {
      slides :'=thSource',
      options : '=thOptions'
    },
    templateUrl: 'app/directives/thslider.tpl.html',
    transclude: true,
    restrict: 'AE',
    replace: true,
    link: function(scope, element, attrs) {
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
