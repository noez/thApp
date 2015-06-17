'use strict';

/**
* app.services Module
*
* Description
*/
angular.module('app.services')
/**
 * @ngdoc service
 * @name Templates
 * @description
 * # Templates
 * Service in the app.services
 */
 .factory('Template', ['$http', '$q', 'baseUrl', function($http, $q, baseUrl) {
  // Public API here
  return {
    get: function(eventId, productId) {
      $http.defaults.withCredentials = false;
      var defered = $q.defer(),
        promise = defered.promise,
        url = baseUrl + 'events/' + eventId + '/templates/?q=' + productId;

      $http.get(url)
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
