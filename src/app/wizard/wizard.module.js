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
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
    $urlRouterProvider) {
    $stateProvider
      .state('wizard', {
        url: '/wizard',
        abstract: true,
        templateUrl: 'app/wizard/wizard.html',
        controller: 'WizardCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }])
  .controller('WizardCtrl', ['$scope', '$rootScope', '$state',
    '$sessionStorage',
    function($scope, $rootScope, $state, $sessionStorage) {
      $scope.$storage = $sessionStorage;

      // default configuration wizard
      var wizardDefaults = {
          steps : [
            {
              id: 1,
              ref: 'type',
              label: 'Tequila',
              valid: true
            },
            {
              id: 2,
              ref: 'order',
              label: 'Pedido',
              valid: false
            },
            {
              id: 3,
              ref: 'event',
              label: 'Evento',
              valid: false
            },
            {
              id: 4,
              ref: 'design',
              label: 'Diseño',
              valid: false
            },
            {
              id: 5,
              ref: 'summary',
              label: 'Resumen',
              valid: false
            }],
          active: 0,
          len: 4
        };
      // ui-sref prefix
      var prefix = 'wizard.';

      // check if the wizard object exists in session
      if (!_.has($scope.$storage, 'wizard') ) {

        // the wizard is equal to an empty object
        $scope.$storage.wizard = {};

        // Assigns own enumerable properties of source objec
        // model wizard in session should be equal to wizardDefaults
        _.assign($scope.$storage.wizard , wizardDefaults);

        // bind wizard model to wizard model in session
        $scope.wizard = $scope.$storage.wizard;

      } else {
        // otherwise wizard model should be equal to last wizard model in session
        $scope.wizard = $scope.$storage.wizard;
      }

      $scope.nextStep = function () {
        var unlock = $scope.wizard.active + 1;
        $scope.wizard.steps[unlock].valid = true;
        $state.go(prefix + $scope.wizard.steps[unlock].ref);
      };

      $scope.resetRight = function() {
        for (var i = $scope.wizard.active; i < $scope.wizard.len; i++) {
          $scope.wizard.steps[i+1].valid = false;
        }
      };



      $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState){


          var toRef = toState.name.replace('wizard.','');

          var toIndex = _.findIndex($scope.wizard.steps, function (step) {
            return step.ref === toRef;
          });

          if(toIndex!= -1) {
            var isUnlocked = $scope.wizard.steps[toIndex].valid;

            if (isUnlocked) {
              $scope.wizard.active = toIndex;
              $scope.resetRight();
            }else {
              $state.go(fromState.name);
            }
          }




      });

      // listen for changes in the steps
      $scope.$on('stepToWizard', function(event, step ){
        if( step.isValid){
          $scope.nextStep();
        }else {
          var unlock = $scope.wizard.active;
          $state.go(prefix + $scope.wizard.steps[unlock].ref);
        }
      });

    }
  ]);
