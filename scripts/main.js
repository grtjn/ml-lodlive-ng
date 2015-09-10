(function(){
  'use strict';
  
  angular
    .module('mlLodLiveNgDemo', [
      'ui.router',
      'ui.bootstrap',
      'ml.lodlive',
      'hljs',
      'mlLodLiveNgDemo.Tpls'
    ])
    
    .config([
      '$locationProvider',
      '$urlRouterProvider',
      '$stateProvider',
      App
    ]);

  function App($locationProvider, $urlRouterProvider, $stateProvider) {

    //$locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'mlLodLiveNgDemo.HomeCtrl',
        controllerAs: 'ctrl',
        templateUrl: '/home.html',
        resolve: {
        }
      })
      .state('quickstart', {
        url: '/quickstart',
        controller: 'mlLodLiveNgDemo.HomeCtrl',
        controllerAs: 'ctrl',
        templateUrl: '/quickstart.html',
        resolve: {
        }
      })
    ;
      
  }
})();

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
