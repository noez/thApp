'use strict';
/**
* wizard.event Module
*
* Description
*/
angular.module('wizard.event', [])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('wizard.event', {
        url: '/event',
        templateUrl: 'app/wizard/events.html',
        controller: 'EventCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }])
  .controller('EventCtrl', ['$scope', function($scope){
    $scope.isValid = false;
      $scope.$emit('stepToWizard', {
      index: 2,
      isValid: $scope.isValid
    });
    $scope.nextStep = function  () {
      $scope.isValid = $scope.actions;
      $scope.$emit('stepToWizard', {
      index: 2,
      isValid: $scope.isValid
    });
    };
  }]);
