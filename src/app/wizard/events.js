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
  .controller('EventCtrl', ['$scope', '$sessionStorage', 'Events', function($scope, $sessionStorage, Events){

    // first call to wizard to keep validate
    $scope.isValid = false;
    $scope.stepIndex = 2;
    $scope.order = $sessionStorage.app.order;

    $scope.events = [];

    var callWizard = function () {
        $scope.$emit('stepToWizard', {
        index: $scope.stepIndex,
        isValid: $scope.isValid
      });
    };
    callWizard();

    Events
      .get()
      .then(function(data) {
        $scope.events = data;
      })
      .catch(function(error) {
        console.log(error);
      });

    var labelsLen = $scope.order.cycle.length;
    var currentIndex = $scope.order.cycle.index;


    if ( _.has($scope.order, 'event')) {
      delete $scope.order.event;

    }

    if(!_.isEmpty($scope.order.labels[0].template || !_.isEmpty($scope.order.labels[0].imgOriginal) )) {

      for( var i = 0; i < $scope.order.labels.length; i++) {
        var cleanLabel = {
          template : {},
          imgOriginal : {},
          render : {}
        };
        $scope.order.labels[i]= cleanLabel;
      }

    }

    $scope.selectEvent = function ( event ) {
     if( ! _.isEmpty(event) ) {
      $scope.isValid = true;
      $scope.order.event = event;
     }
     callWizard();
    };

  }]);
