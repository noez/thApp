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
  .controller('TypeCtrl', ['$scope', function($scope){
    $scope.isValid = $scope.actions;
    $scope.$emit('stepToWizard', {
      index: 0,
      isValid: $scope.isValid
    });

    $scope.nextStep = function  () {
      $scope.isValid = $scope.actions;
      $scope.$emit('stepToWizard', {
      index: 0,
      isValid: $scope.isValid
    });
    };
  }]);
