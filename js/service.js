var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
  $http.get("data.json").then(function (response) {
      $scope.myData = response.data;
  });
});