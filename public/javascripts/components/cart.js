(function(){
	var cart = angular.module('ggbooks.cart', []);

	cart.controller('CartCtrl' , [
	'$scope',
	'$state',
	'$stateParams',
	'auth',
	'dataservice',
	function($scope, $state, $stateParams, auth, dataservice) {
		$scope.update = function(){
			$scope.currentUser = auth.currentUser();
			// $scope.cart = dataservice.getCart();
			$scope.cart = dataservice.getSearchResults();
		}
		$scope.update();

		$scope.range = function(num){
	  	return new Array(num);
	  }

	  $scope.orderBooks = function(cart){
	  	$stateParams.cart = cart;
	  	$state.go('order');
	  }

	}]);
})();