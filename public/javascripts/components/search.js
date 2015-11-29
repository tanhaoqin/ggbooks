(function(){
	var search = angular.module('ggbooks.search', []);

	search.controller('SearchCtrl' , [
	'$scope',
	'auth',
	'dataservice',
	function($scope, auth, dataservice) {
		$scope.update = function(){
			$scope.currentUser = auth.currentUser();
			$scope.featured = dataservice.getSearchResults();
		}
		$scope.update();

		$scope.range = function(num){
	  	return new Array(num);
	  }
	}]);
})();