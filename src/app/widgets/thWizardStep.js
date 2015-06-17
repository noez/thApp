'use strict';
/**
 * app.widgets Module
 *
 * Description
 */
angular
  .module('app.widgets')
  .directive('thWizardStep', ['$compile', function ($compile) {
    // Runs during compile
    return {
      restrict: 'E',
      scope: {
        ref: '@stepRef',
        valid: '=stepValid',
        step: '=step'
      },
      template: [
        '<a class="step">',
        '<span class="step-dot">{{ step.id }}</span>',
        '<span class="step-label">{{ step.label }}</span>',
        '</a>'
      ].join(''),
      transclude: true,
      replace: true,
      link: function (scope, element) {
        $compile(element)(scope);
        //listening changes
        scope.$watch('valid', function (bool) {
          if (bool) {
            element.attr('ui-sref', scope.ref);
            element.attr('ui-sref-active', 'active');
          } else {
            element.removeAttr('ui-sref');
            element.removeAttr('href');
          }
          $compile(element)(scope);
        });
      }
    };
  }]);

