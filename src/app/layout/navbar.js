'use strict';
/**
* app.navbar Module
*
* Description
*/
angular.module('app.navbar', [])
  .controller('NavBarCtrl', ['$scope', function($scope){
    $scope.collapsed = true;
  }]);
