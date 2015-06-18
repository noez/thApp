'use strict';

angular.module('app.services')
  .factory('UploadImage', ['$http', '$q', 'baseUrl', 'token',function($http, $q, baseUrl, token){
    return {
      send: function(fd) {
      var defered = $q.defer(),
        promise = defered.promise,
        fragmentUrl = 'uploadimages/';

      $http
        .post(baseUrl + fragmentUrl, fd, {
          headers: {
            'Content-Type': undefined,
            'Authorization': token
          },
          transformRequest: angular.identify
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
