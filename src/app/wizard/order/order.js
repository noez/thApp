'use strict';
/**
* wizard.order Module
*
* Description
*/
angular.module('wizard.order', [])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('wizard.order', {
        url: '/order',
        templateUrl: 'app/wizard/order.html',
        controller: 'OrderCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }])
  .controller('OrderCtrl', ['$scope', function($scope){

  }]);
