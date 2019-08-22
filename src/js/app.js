
(function () {
  'use strict';

  angular
    .module('app', [])
    .controller('HomeController', HomeController);

  function HomeController ($scope) {
    $scope.title = 'You will never win!';
  }

  HomeController.$inject = ['$scope'];
}());
