var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http, $location, $anchorScroll) {
		
	$http.get("data.json").then(function (response) {
		$scope.myData = response.data;
	});
	
	$scope.hoverIn = function(){
        this.hoverEdit = true;
    };

    $scope.hoverOut = function(){
        this.hoverEdit = false;
    };
	
	$scope.gotoE = function(id) {
        
        $anchorScroll(id);
      };
});


	
app.directive("contenteditable", function() {
  return {
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
});