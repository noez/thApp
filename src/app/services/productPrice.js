'use strict';

/**
* app.services Module
*
* Description
*/
angular.module('app.services')
/**
 * @ngdoc service
 * @name ProductPrice
 * @description
 * # ProductPrice
 * Service in the app.services
 */
.factory('ProductPrice', ['$http', '$q', 'baseUrl', function($http, $q, baseUrl) {
  // Public API here

  return {
    get: function(productId) {
      $http.defaults.withCredentials = false;

      var defered = $q.defer(),
        promise = defered.promise,
        fragmentUrl = 'products/';

      $http.get(baseUrl + fragmentUrl + productId + '/stockrecords')
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
