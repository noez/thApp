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
    $scope.slides = [{
      title: 'Tu Momento Especial',
      caption: 'Porque siempre hay esa canción, aroma, lugar que lo revive.',
      src: 'assets/images/slide-1.jpg',
      action: 'Comience ahora',
      position: 'top-left'
    }, /*{
      title: 'Transfórmalo',
      caption: 'Esa fotografía tomada por el corazón.',
      src: 'images/slides-2.jpg',
      action: 'No esperes más',
      position: 'top-right'
    },*/ {
      title: 'A un Recuerdo Eterno',
      caption: 'Conservar es asegurar que no se olvide.',
      src: 'assets/images/slide-3.jpg',
      action: 'Envíe su pedido hoy',
      position: 'top-right'
    }];

    $scope.sliderOpts = {
      'inherit_width_from' : '.fixed-left',
      'inherit_height_from' : '.fixed-left',
      'play' : 6000
    };

  }]);
