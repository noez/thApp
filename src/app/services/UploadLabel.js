'use strict';

angular.module('app.services')
  .factory('UploadLabel', ['$http', '$q','baseUrl', 'token', function($http, $q, baseUrl, token){
    return {
      send : function (data) {

        var defered = $q.defer(),
          promise = defered.promise,
          fragmentUrl = 'labels/';

        $http
          .post(baseUrl + fragmentUrl, data , {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          })
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
