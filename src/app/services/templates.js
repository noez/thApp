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
 .factory('Templates', ['$http', '$q', 'baseUrl', function($http, $q, baseUrl) {
  // Public API here
  return {
    get: function(params) {
      $http.defaults.withCredentials = false;
      var defered = $q.defer(),
        promise = defered.promise,
        url = baseUrl + 'events/' + params.eventId + '/templates/?q=' + params.typeId;

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
