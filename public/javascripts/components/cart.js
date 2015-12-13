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
			$scope.orderStatus = false;
			$scope.cart = ""
			$scope.recommendedBooks = ""
			$scope.getCart();
		}
		$scope.update();

		$scope.range = function(num){
	  	return new Array(num);
	  }

	  $scope.getCart = function(){
	  	dataservice.getCart(function(res){
	  		$scope.cart = res;
	  	})
	  }

	  $scope.orderBooks = function(cart){
	  	$stateParams.cart = cart;
			$scope.orderStatus = true;
			$scope.getRecommendations();
	  }

	  $scope.getRecommendations = function() {
	  	$scope.recommendedBooks = dataservice.topSellers;
	  }

	}]);
})();