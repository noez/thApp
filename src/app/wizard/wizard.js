'use strict';
/**
* app.wizard Module
*
* Description
*/
angular.module('app.wizard', [
  'wizard.type',
  'wizard.order',
  'wizard.event',
  'wizard.design',
  'wizard.summary'
])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('wizard',{
          url : '/wizard',
          abstract: true,
          templateUrl: 'app/wizard/wizard.html',
          controller: 'WizardCtrl'
        });
      $urlRouterProvider.otherwise('/wizard/type');
    }])
  .controller('WizardCtrl', ['$scope', '$rootScope','$state', '$sessionStorage', function($scope, $rootScope,$state, $sessionStorage){

      $scope.$storage = $sessionStorage;



      // default steps
      var defaultSteps = [{
        id: 1,
        ref: 'type',
        label: 'Tequila',
        valid: true
      }, {
        id: 2,
        ref: 'order',
        label: 'Pedido',
        valid: false
      }, {
        id: 3,
        ref: 'event',
        label: 'Evento',
        valid: false
      }, {
        id: 4,
        ref: 'design',
        label: 'Diseño',
        valid: false
      }, {
        id: 5,
        ref: 'summary',
        label: 'Resumen',
        valid: false
      }],

      // ui-sref prefix
      prefix = 'wizard.';

      if (_.isEm) {};

      if(_.isEmpty($scope.$storage.steps)) {
        $scope.$storage.steps = defaultSteps;
      }

      // listen for changes in the steps
      $scope.$on('stepChange', function(event, step ){
        if(step.isValid) {
          // enable next step in the process
          $scope.$storage.steps[step.index + 1].valid = true;
          // go to the next step in the process
          $state.go(prefix + $scope.$storage.steps[step.index + 1].ref);
        }
      });

    }]);
