'use strict';
/**
 * app.widget Module
 *
 * Build a full back slider background
 */
angular
  .module('app.widgets')
  .directive('thTemplates', ['Templates', 'DesignData',function(Templates, DesignData){
    // Runs during compile
    return {
      scope: {
        params : '=thParams'
      }, // {} = isolate, true = child, false/undefined = no change
      controller: function($scope, $element, $attrs, $transclude) {
        console.log($scope.params);
        $scope.templates = [];

        this.getTemplates = function () {
          Templates
            .get($scope.params)
            .then(function (data) {
              console.log('data', data);
              $scope.templates = data;
            })
            .catch(function(error) {
              console.log('error:', error);
            });
        };
        $scope.selectTemplate = function (template) {
          console.log('Template seleccionado', template);
          DesignData.template = template;
        };
      },
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      // template: '',
      templateUrl: 'app/widgets/thTemplates.html',
      replace: true,
      transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function($scope, iElm, iAttrs, controller) {
        $scope.$watch('params', function (newVal) {
          if (!_.isEmpty(newVal)) {
            console.log('parametros listos', newVal);
            return controller.getTemplates();
          }
        });
      }
    };
  }]);
