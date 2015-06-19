'use strict';

angular.module('app.services')
  .factory('Oscar', ['$http',  '$q', function($http,  $q){
    return {
      send : function (url, data) {
        console.log('sevice says ' + typeof data);
        var defered = $q.defer(),
          promise = defered.promise;

        $http
          .post(url, data , {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: angular.identify
          })
          .success(function(data) {
            defered.resolve(data);
          })
          .error(function(err) {
            defered.reject(err);
          });
        console.log($http.defaults);
        return promise;
      }
    };
  }]);

