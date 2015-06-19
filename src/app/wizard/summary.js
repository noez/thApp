'use strict';
/**
* wizard.summary Module
*
* Description
*/
angular.module('wizard.summary', [])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('wizard.summary', {
        url: '/summary',
        templateUrl: 'app/wizard/summary.html',
        controller: 'SummaryCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }])
  .controller('SummaryCtrl', ['$scope','$state','$sessionStorage','$cookies','$window', 'baseUrl', 'Oscar' ,function($scope, $state, $sessionStorage, $cookies, $window, baseUrl, Oscar){
    $scope.order = $sessionStorage.app.order;
    $scope.labels = $scope.order.labels;
    $scope.cycle = $scope.order.cycle;
    $scope.isAllowed = true;

    $scope.continueDesigning = function () {
      if($scope.cycle.index < $scope.cycle.length) {
        $scope.cycle.index++;
        $scope.isAllowed = true;
      }else {
        $scope.cycle.index = $scope.cycle.length;
        $scope.isAllowed = false;
      }

      if (!$scope.isAllowed) {
        alert('Has completado el número de etiquetas disponibles.');
      }else {
        $state.go('wizard.design');
      }
    };

    var labels = [];
    $scope.renders = [];
    $scope.priceTotal = $scope.order.size.priceTotal;

    _.forEach($scope.labels, function (label) {
      if(!_.isEmpty(label.render)) {
        $scope.renders.push(label);
        labels.push(label.render.id);
      }
    });

    console.log($scope.renders);



    $scope.checkout = function () {


      console.log($cookies);
      var cartData = {
          csrfmiddlewaretoken: $cookies.get('csrftoken'),
          quantity: $scope.order.size.qty,
          labels : labels
      };

      var cartUrl = baseUrl.replace('dashboard/api/' , 'basket/add/') + $scope.order.size.product.id + '/';

      console.log(cartData);
      console.log(cartUrl);
      Oscar
        .send(cartUrl,  $.param(cartData) )
        .then(function(res) {
          delete  $sessionStorage.app;
          delete  $sessionStorage.wizard;
          $window.location.href = "/checkout";

        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }]);
