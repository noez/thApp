'use strict';
/**
 * app.widget Module
 *
 * Build a full back slider background
 */
angular
  .module('app.widgets')
  .directive('thFileUpload',['$parse',function ($parse) {
    // Runs during compile
      return {
    restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    link: function(scope, element, attrs) {
      element.bind('change', function() {
        $parse(attrs.thFileUpload)
          .assign(scope, element[0].files);
        scope.$apply();
      });
    }
  };
  }]);
