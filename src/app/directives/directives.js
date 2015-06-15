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
  }])

  .directive('thTequilaCard', [function() {
    // Runs during compile
    return {
      restrict: 'A',
      scope: {
        type: '=thType',
        size: '@thSize',
        selected: '&thSelected'
      },
      transclude: true,
      template: [
        '<div class="th-card">',
          '<div class="th-card-panel" ng-click="onSelectType(type);">',
            '<div class="th-card-body">',
              '<img ng-src="{{ type.bimage }}" height="{{ size }}" />',
              '<h2 class="th-card-name"> {{ type.name }}</h2>',
            '</div>',
          '</div>',
        '</div>'
      ].join(''),
      link: function(scope) {
        scope.onSelectType = function(type) {
          scope.selected(type);
        };
      }
    };
  }]);
