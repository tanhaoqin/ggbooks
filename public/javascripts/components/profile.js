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

		$scope.init();
	}]);
})();