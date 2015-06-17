'use strict';
/**
* wizard.design Module
*
* Description
*/
angular.module('wizard.design', [])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('wizard.design', {
        url: '/design',
        templateUrl: 'app/wizard/design.html',
        controller: 'DesignCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }])
  .controller('DesignCtrl', ['$scope', function($scope){
    $scope.isValid = false;
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
