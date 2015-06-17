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
        templateUrl: 'app/wizard/event.html',
        controller: 'EventCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }])
  .controller('EventCtrl', ['$scope', function($scope){

  }]);
