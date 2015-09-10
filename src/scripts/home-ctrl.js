(function () {
  'use strict';

  angular.module('mlLodLiveNgDemo')
  
    .factory('HomeModel', ['$window', function ($window) {
      return {
      };
    }])
    
    .controller('mlLodLiveNgDemo.HomeCtrl', [
      '$scope',
      '$http',
      '$location',
      '$window',
      'HomeModel',
      HomeCtrl
    ]);
  
  function HomeCtrl($scope, $http, $location, $window, model) {
    
    // $http
    //   .get('data/sparql-result.json')
    //   .success(function(response){
    //     model.result = response;
    //   });

    angular
      .extend($scope, {
        model: model
      });

  }
  
}());
