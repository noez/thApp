'use strict';
/**
* Services Module
*
* Description
*/
angular.module('app.services', [])
  .constant('baseUrl', 'http://maravatio.haushaus.mx/dashboard/api/')

  .factory('Types', ['$http','$q', 'baseUrl',  function($http, $q, baseUrl){
    return {
      getAll: function(){
        var defered = $q.defer(),
          promise = defered.promise,
          fragmentUrl = 'types/';

        $http.get(baseUrl + fragmentUrl)
          .success(function (data){
            defered.resolve(data);
          })
          .error(function (err) {
            defered.reject(err);
          });
        return promise;
      }
    };
  }]);
