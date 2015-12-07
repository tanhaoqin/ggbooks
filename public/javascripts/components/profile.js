(function(){
	var profile = angular.module('ggbooks.profile', []);

	profile.controller('ProfileCtrl' , [
	'$scope',
	'$state',
	'$stateParams',
	'auth',	
	'dataservice',
	function($scope, $state, $stateParams, auth, dataservice) {
		$scope.init = function(){
			$scope.user = auth.currentUser();
		};

		$scope.countFullStars = function(num){
			return new Array(parseInt(num/2));
		}

		$scope.countHalfStars = function(num){
			return new Array(parseInt(num%2));
		}

		$scope.countEmptyStars = function(num){
			return new Array(5 - parseInt(parseInt(num)/2) - parseInt(num%2));
		}

		$scope.init();
	}]);
})();