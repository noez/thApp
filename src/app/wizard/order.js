'use strict';
/**
* wizard.order Module
*
* Description
*/
angular.module('wizard.order', [])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('wizard.order', {
        url: '/order',
        templateUrl: 'app/wizard/order.html',
        controller: 'OrderCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }])
  .controller('OrderCtrl', ['$scope','$sessionStorage', 'Products', 'ProductPrice',function($scope, $sessionStorage, Products, ProductPrice){
    $scope.stepIndex = 1;
    $scope.isValid = false;
    $scope.order = $sessionStorage.app.order;

    $scope.products = [];
    $scope.product = {};
    $scope.qty = null;
    $scope.productPrice = null;
    $scope.priceTotal = null;

    var getProducts = function (inSession) {
      Products
        .getAll($scope.order.type.id)
        .then(function (data) {
          $scope.products = data;
          if (inSession) {
            var productIndex = _.findIndex($scope.products, function (product){
              return product.id === $scope.order.size.product.id;
            });
            $scope.product = $scope.products[productIndex];
          }
        })
        .catch(function (err) {
          console.log('error', err);
        });
    };

    var validateStep = function () {
      if( !_.isUndefined($scope.product) && !_.isUndefined($scope.qty) && !_.isUndefined($scope.priceTotal) ) {
        $scope.isValid = true;
      }else {
        $scope.isValid = false;
      }
      return $scope.isValid;
    };

    // checar que existe en sesion el size
    if (_.has($scope.order, 'size') && !_.isEmpty($scope.order.size) ) {
      console.log('existe size en sesion');
      console.log($scope.order);
      $scope.qty = $scope.order.size.qty;
      getProducts(true);
    } else {
      // si no existe crear el objeto en sesion
      $scope.order.size = {};
      console.log($scope.order);
      getProducts(false);
      $scope.qty = 1;
    }

    // observar cambios de product
    $scope.$watch('product', function(product) {
      // validate product value
      if (!_.isEmpty(product)) {
        // fetch the price of the selected product
        ProductPrice
          .get(product.id)
          .then(function(data) {
            $scope.productPrice = data[0];
            $scope.priceTotal = $scope.qty * $scope.productPrice['price_excl_tax'];
            validateStep();
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    });

    // escuchar cambios de cantidad de cajas
    $scope.$watch('qty', function(newVal) {
      if (!_.isUndefined(newVal) && (newVal >= 1 )) {
        $scope.qty = newVal;
        if (! _.isEmpty( $scope.productPrice ) ) {
          $scope.priceTotal = $scope.qty * $scope.productPrice['price_excl_tax'];
        }
      }else {
        $scope.qty = 1;
      }

      validateStep();
    });

    var callWizard = function () {
      $scope.$emit('stepToWizard', {
        index: $scope.stepIndex,
        isValid: $scope.isValid
      });
    };

    callWizard();

    $scope.nextStep = function () {
      $scope.order.size = {
        qty : $scope.qty,
        priceTotal : $scope.priceTotal,
        product : $scope.product
      };

      $scope.order.cycle = {
        index: 1,
        length : $scope.qty * $scope.product.maxlabels
      };

      $scope.order.labels = [];

      callWizard();
    };

  }]);
