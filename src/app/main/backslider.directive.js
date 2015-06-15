'use strict';

angular.module('app')
.directive('thBackSlider', ['$timeout', function($timeout){

  return {
    scope: {
      slides :'=thSource',
      options : '=thOptions'
    },
    templateUrl: 'app/main/backslider.tpl.html',
    transclude: true,
    restrict: 'AE',
    replace: true,
    link: function(scope, element, attrs) {
      element.superslides();
    }
  };
}]);
