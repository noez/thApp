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
  .controller('DesignCtrl', ['$scope', '$sessionStorage', 'Templates','UploadImage','DesignData',function($scope, $sessionStorage, Templates,UploadImage, DesignData){
    $scope.stepIndex = 3;
    $scope.isValid = false;
    $scope.order = $sessionStorage.app.order;
    $scope.labels = $scope.order.labels;
    $scope.designData = DesignData;
    console.log('labels', $scope.labels);

    var callWizard = function () {
      $scope.$emit('stepToWizard', {
        index: $scope.stepIndex,
        isValid: $scope.isValid
      });
    };
    callWizard();

    // 1 obtener id`s tanto de evento, como de tipo de tequila
    // estos valores se le pasaran a la directiva
    $scope.params = {
      eventId : $scope.order.event.id,
      typeId : $scope.order.type.id
    };

    // 2 logica para subir imagen
    // escuchar a la directiva thFileUpload
    $scope.$watch('files', function (newVal) {
      if(!_.isUndefined(newVal) && !_.isNull(newVal)) {
        var fd = new FormData();
        angular.forEach($scope.files, function (file) {
          fd.append('file', file);
        });
        console.log('fd', fd);
        UploadImage
          .send( fd )
          .then( function ( data ) {
            $scope.imageUploaded = data;
          })
          .catch(function ( error ) {
            console.log('error', error);
          });
      }
    });

    // recuperar imagen base
    $scope.product = $scope.order.size.product;

    // recuperar template seleccionado
    $scope.$watch('designData.template', function(newVal) {
      if (!_.isEmpty(newVal)) {
        $scope.templateLabel = newVal;
      }
    });

    // titulos para la etiqueta
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





  }]);
