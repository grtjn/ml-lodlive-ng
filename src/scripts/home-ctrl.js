(function () {
  'use strict';

  angular.module('mlLodLiveNgDemo')
  
    .factory('HomeModel', ['$window', 'MLLodliveProfileFactory', function ($window, factory) {
      return {
        iri: 'http://dbpedia.org/resource/Barack_Obama',
        profile: factory.profile('dbpedia')
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
