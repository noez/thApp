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
          templateUrl: 'app/wizard/type/type.html',
          controller: 'TypeCtrl'
        });
      $urlRouterProvider.otherwise('/');
    }])
  .controller('TypeCtrl', ['$scope', function($scope){

  }]);
