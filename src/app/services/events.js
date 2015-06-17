'use strict';

/**
* app.services Module
*
* Description
*/
angular.module('app.services')
/**
 * @ngdoc service
 * @name Event
 * @description
 * # Event
 * Service in the app.services
 */
.factory('Events', ['$http', '$q', 'baseUrl', function($http, $q, baseUrl) {
  // Public API here

  return {
    get: function() {
      $http.defaults.withCredentials = false;
      var defered = $q.defer(),
        promise = defered.promise,
        fragmentUrl = 'events/';

      $http.get(baseUrl + fragmentUrl)
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
