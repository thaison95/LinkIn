/**
 * Created by Administrator on 25/04/2016.
 */
var app = angular.module('myApp', []);

app.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);
	
app.controller('myCtrl', function($scope, $http, $location, $anchorScroll) {
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
	
	$scope.gotoE = function(id) {
        
        $anchorScroll(id);
    };
	  
	$scope.addE = function() {
		var temp = new Object();
		temp.position = "Position";
		temp.company = "Company";
		temp.date = "Date";
		temp.company_img = "";
		temp.description = "Description";
		$scope.data.background.experience.push(temp);
	};
	
	$scope.addS = function() {
		var temp = new Object();
		temp.endorse_count = "50";
		temp.skill_name = "Language";		
		$scope.data.background.skill.push(temp);
	};
	
	$scope.addP = function() {
		var temp = new Object();
		temp.project_name = "Project Name";
		temp.project_description = "Project description";		
		$scope.data.background.project.push(temp);
	};
	
	$scope.addEdu = function() {
		var temp = new Object();
		temp.school = "School Name";
		temp.degree = "Degree";	
		temp.major = "Major";
		temp.education_date = "Education Date";
		temp.school_img = "";
		$scope.data.background.education.push(temp);
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