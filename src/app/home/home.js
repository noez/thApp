'use strict';
/**
* app.home Module
*
* Description
*/
angular.module('app.home', [])
  .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
    $stateProvider
      .state('home',{
        url : '/',
        templateUrl: 'app/home/home.html',
        controller : 'HomeCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }])
  .controller('HomeCtrl', ['$scope', function($scope){
    console.log($scope, 'working puto');
  }]);
