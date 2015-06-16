'use strict';
/**
* app.directives Module
*
* Description
*/
angular.module('app.directives', [])
  .directive('thIncludeReplace', [function(){
    // Runs during compile
    return {
      require: 'ngInclude',
      restrict: 'A',
      link: function(scope, element, attrs) {
          element.replaceWith(element.children());
      }
    };
}]);


