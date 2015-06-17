'use strict';
/**
* app.services Module
*
* Description
*/
angular.module('app.services')
  .factory('Types', ['$http','$q', 'baseUrl', function($http, $q, baseUrl){
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
