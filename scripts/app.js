/**
 * Created by Administrator on 25/04/2016.
 */
var app = angular.module('myApp', []);

app.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);
	
app.controller('myCtrl', function($scope, $http) {
    $scope.showmore=false;
    $http({
        method : "GET",
        url : "data.json"
    }).then(function mySucces(response) {
        $scope.data = response.data;
    }, function myError(response) {
        $scope.data = response.statusText;
    });
	
	$scope.hoverIn = function(){
        this.hoverEdit = true;
    };

    $scope.hoverOut = function(){
        this.hoverEdit = false;
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