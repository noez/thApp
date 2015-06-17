'use strict';
/**
* wizard.summary Module
*
* Description
*/
angular.module('wizard.summary', [])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('wizard.summary', {
        url: '/summary',
        templateUrl: 'app/wizard/summary.html',
        controller: 'SummaryCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }])
  .controller('SummaryCtrl', ['$scope', function($scope){

  }]);
