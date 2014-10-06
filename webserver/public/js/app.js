'use strict';


/**
 * Module - Main App module 
 */
angular.module('nmApp', ['ngRoute', 'nmApp.controllers', 'yaru22.angular-timeago', 'nmApp.services'] )



.config(function ($routeProvider, $locationProvider) {
  
  $routeProvider

    .when('/', {
      templateUrl: 'views/list.tpl.html',
      controller: 'HomeCtrl'
    })


    .when('/details', {
      templateUrl: 'views/details.tpl.html',
      controller: 'DetailsCtrl'
    })

   .otherwise({
     redirectTo: '/'
   });

  $locationProvider.html5Mode(false);

});
