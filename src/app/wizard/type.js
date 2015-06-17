'use strict';
/**
* wizard.type Module
*
* Description
*/
angular.module('wizard.type', [])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('wizard.type', {
          url: '/type',
          templateUrl: 'app/wizard/type.html',
          controller: 'TypeCtrl'
        });
      $urlRouterProvider.otherwise('/');
    }])
  .controller('TypeCtrl', ['$scope', '$sessionStorage', function($scope, $sessionStorage){
    $scope.$storage = $sessionStorage;
    $scope.stepIndex = 0;
    $scope.isValid = false;

    var callWizard = function () {
      $scope.$emit('stepToWizard', {
        index: $scope.stepIndex,
        isValid: $scope.isValid
      });
    };

    // activate validation
    callWizard();

    // check if the app object exists in session
    if (!_.has($scope.$storage, 'app')) {
      $scope.$storage.app = { order : {} };
      $scope.app = $scope.$storage.app;
    }else {
      // delete all an create again
      delete $scope.$storage.app;
      $scope.$storage.app = { order : {} };
      $scope.app = $scope.$storage.app;
    }

    $scope.typeSelected = $scope.app.order.type || null;

    $scope.selected = function (type) {
      $scope.typeSelected = type;
      $scope.app.order.type = $scope.typeSelected;
      $scope.isValid = true;

      callWizard();
    };

  }]);
