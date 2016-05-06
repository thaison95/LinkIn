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
	
	$scope.addE = function() {
		var temp = new Object();
		temp.position = "Developer";
		temp.company = "at school";
		temp.date = "August 2013 – Present (2 years 8 months)";
		temp.company_img = "";
		temp.description = "In this time, I learn how to use C++, C#, Java, SQL and complete personal projects.";
		$scope.data.background.experience.push(temp);
	};
	
	$scope.addS = function() {
		var temp = new Object();
		temp.endorse_count = "100";
		temp.skill_name = "C++";		
		$scope.data.background.skill.push(temp);
	};
	
	/* $scope.addP = function() {
		var temp = new Object();
		temp.endorse_count = "100";
		temp.skill_name = "C++";		
		$scope.data.background.skill.push(temp);
	}; */
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