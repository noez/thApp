'use strict';
/**
 * app.widgets Module
 *
 * Description
 */
angular.module('app.widgets')
  .directive('thTequilaCard', ['$parse',function($parse) {
    // Runs during compile
    return {
      restrict: 'A',
      scope: {
        type: '=thType',
        size: '@thSize',
        selected: '&thSelected'
      },
      transclude: true,
      templateUrl: 'app/widgets/thTequilaCard.html',
      link: function(scope) {

        scope.onSelectType = function(type) {
          scope.selected(type);
        };
      }
    };
  }]);
