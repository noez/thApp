'use strict';

angular.module('app.widgets')
  .directive('thLabel', [ 'DesignData' ,function(DesignData){
  // Runs during compile
  return {
    scope: {
      image : '=thImage',
      label : '=thLabel',
      build: '=thBuild'
    },
    templateUrl : 'app/widgets/thLabel.html',
    replace: true,
    link: function(scope, element) {
      scope.designData = DesignData;

      var isInitialized = false,
      label = element.parent();
      scope.$watch('image', function(newVal) {
        if (isInitialized) {
          return;
        } else if (!_.isUndefined(newVal) && !_.isEmpty(newVal)) {
          isInitialized = true;
        }
      });

      scope.$watch('build', function(newVal) {
        if (newVal) {
          html2canvas(label, {
            onrendered: function(canvas){
             scope.$apply(function() {
              scope.label = canvas.toDataURL();
             });
            }
          });
        }
      });
    }
  };
}]);
