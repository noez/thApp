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
  .controller('DesignCtrl', ['$scope', '$sessionStorage', 'Templates', function($scope, $sessionStorage, Templates){
    $scope.isValid = false;
    $scope.order = $sessionStorage.order;

    $scope.$emit('stepToWizard', {
      index: 0,
      isValid: $scope.isValid
    });

    if ( ) {

    }
    $scope.nextStep = function  () {
      $scope.isValid = $scope.actions;
      $scope.$emit('stepToWizard', {
      index: 0,
      isValid: $scope.isValid
    });
    };


  }]);
