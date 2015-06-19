'use strict';
/**
* wizard.design Module
*
* Description
*/
angular.module('wizard.design', [])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('wizard.design', {
        url: '/design',
        templateUrl: 'app/wizard/design.html',
        controller: 'DesignCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }])
  .controller('DesignCtrl', ['$scope', '$sessionStorage', 'Templates','UploadImage','UploadLabel','DesignData',function($scope, $sessionStorage, Templates,UploadImage, UploadLabel, DesignData){

    // defaults
    $scope.stepIndex = 3;
    $scope.isValid = false;

    var callWizard = function () {
      $scope.$emit('stepToWizard', {
        index: $scope.stepIndex,
        isValid: $scope.isValid
      });
    };
    callWizard();

    // obtener orden de pedido
    $scope.order = $sessionStorage.app.order;

    $scope.params = {
      eventId : $scope.order.event.id,
      typeId : $scope.order.type.id
    };

    $scope.product = $scope.order.size.product;

    // obtener ciclo
    $scope.cycle = $scope.order.cycle;

    // obtener arreglo de etiquetas
    $scope.labels = $scope.order.labels;

    // helpe
    $scope.designData = DesignData;

    $scope.currentLabel = $scope.labels[$scope.cycle.index - 1];

    $scope.template = {};

    _.assign($scope.template, $scope.currentLabel.template);


    $scope.$on('thTemplateSelected', function (evt, tpl) {
      $scope.template = tpl;
      _.assign($scope.currentLabel.template, $scope.template);
    });

    $scope.imageUploaded = {};
    $scope.imageUploadedReady = false;

    _.assign($scope.imageUploaded, $scope.currentLabel.imgOriginal);

    if(!_.isEmpty($scope.imageUploaded)) {
      $scope.isValid = true;
    }

    $scope.$watch('files', function (newVal) {
      if(!_.isUndefined(newVal) && !_.isNull(newVal)) {
        var fd = new FormData();
        angular.forEach($scope.files, function (file) {
          fd.append('file', file);
        });

        UploadImage
          .send( fd )
          .then( function ( data ) {
            $scope.imageUploaded = data;
            _.assign($scope.currentLabel.imgOriginal, $scope.imageUploaded);
            $scope.isValid = true;
          })
          .catch(function ( error ) {
            console.log('error', error);
          });
      }
    });

    $scope.labelRender = undefined;
    $scope.labelBuild = false;

    $scope.processedLabel = {};
    _.assign($scope.processedLabel, $scope.currentLabel.render);

    if(!_.isEmpty($scope.processedLabel)) {
      $scope.currentLabel.render = {};
    }

    $scope.$watch('labelRender', function(newVal) {
      if (!_.isUndefined(newVal) && !_.isNull(newVal)) {

        // if this validation passes
        // creates the rendered tag data to be sent to the server
        var labelData = {
          uploadimage : $scope.imageUploaded.id,
          label : $scope.labelRender,
          name : '',
          template: $scope.template.id || null
        };


        // send labe to the server
        UploadLabel
          .send(labelData)
          .then(function(data) {
            if (!_.isEmpty(data)&& !( _.isNull(data) || _.isUndefined(data) ) ){
              $scope.processedLabel = data;
              _.assign($scope.currentLabel.render, $scope.processedLabel);

              $scope.isValid = true;
            }else {
              $scope.isValid = false;
            }

            callWizard();

          })
          .catch(function(err) {
            console.log(err);
          });
      }
    });

    $scope.fontStacks = [
      {
        'name': 'Arial',
        'stack': 'sans-a'
      },
      {
        'name' : 'Times New Roman',
        'stack' : 'serif-a'
      },
      {
        'name' : 'Comic Sans MS',
        'stack' : 'sans-b'
      },
      {
        'name' : 'Georgia',
        'stack' : 'serif-b'
      }
    ];
    $scope.designData.firstTl = 'Texto Primario';
    $scope.designData.secondTl = 'Texto Secundario';
    $scope.designData.font = $scope.fontStacks[0];

    $scope.nextStep = function () {
      $scope.labelBuild = true;

    };









  }]);
