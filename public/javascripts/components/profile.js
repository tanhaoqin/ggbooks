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
			$scope.getUser();
		};

		$scope.getUser = function(){
			dataservice.getUser(function(res){
				$scope.profile = res.user[0];
				$scope.orders = res.orders;
				$scope.feedbacks = res.feedback;
			});
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