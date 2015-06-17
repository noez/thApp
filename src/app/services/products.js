'use strict';

/**
* app.services Module
*
* Description
*/
angular.module('app.services')
/**
 * @ngdoc service
 * @name Products
 * @description
 * # Products
 * Service in the app.services
 */
.factory('Products', ['$http', '$q', 'baseUrl', function($http, $q, baseUrl) {
  // Public API here
  return {
    getAll: function(typeId) {
      $http.defaults.withCredentials = false;
      var defered = $q.defer(),
        promise = defered.promise,
        fragmentUrl = '/products/';

      $http.get(baseUrl + 'types/' + typeId + fragmentUrl)
        .success(function(data) {
          defered.resolve(data);
        })
        .error(function(err) {
          defered.reject(err);
        });

      return promise;
    },
    getById : function(productId) {
      var defered = $q.defer(),
        promise = defered.promise,
        fragmentUrl = 'products/';

      $http.get(baseUrl + fragmentUrl + productId)
        .success(function(data) {
          defered.resolve(data);
        })
        .error(function(err) {
          defered.reject(err);
        });

      return promise;
    }
  };
}]);
