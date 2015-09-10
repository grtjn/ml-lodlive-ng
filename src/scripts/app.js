(function(){
  'use strict';
  
  angular
    .module('mlGoogleMapsDemo', [
      'ui.router',
      'ui.bootstrap',
      'uiGmapgoogle-maps',
      'ml.google-maps',
      'hljs',
      'mlGoogleMapsDemo.Tpls'
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
        controller: 'mlGoogleMapsDemo.HomeCtrl',
        controllerAs: 'ctrl',
        templateUrl: '/home.html',
        resolve: {
        }
      })
      .state('quickstart', {
        url: '/quickstart',
        controller: 'mlGoogleMapsDemo.HomeCtrl',
        controllerAs: 'ctrl',
        templateUrl: '/quickstart.html',
        resolve: {
        }
      })
    ;
      
  }
})();