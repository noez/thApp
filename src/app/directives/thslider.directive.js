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
        defaults = {};

      if (!_.isEmpty(scope.options)) {
        angular.extend(defaults, scope.options);
        console.log('options', scope.options);
      }

      scope.$watch('slides', function(newVal) {
        if ( !( _.isUndefined(newVal) || _.isNull(newVal)) ) {
          $timeout(function() {
            superslides = element.superslides(scope.options);
          },500);
        }
      });
    }
  };
}]);
