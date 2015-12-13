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
			$scope.totalPrice = 0;
			$scope.cart = ""
			$scope.recommendedBooks = ""
			$scope.getCart();
		}

		$scope.range = function(num){
	  	return new Array(num);
	  }

	  $scope.getCart = function(){
	  	var item;
			$scope.totalPrice = 0;
	  	dataservice.getCart(function(res){
	  		$scope.cart = res['cart'];
	  		for (var i = 0; i < $scope.cart.length; i++) {
		  		item = $scope.cart[i]
		  		$scope.totalPrice += (item.price * item.quantity);
	  		};
	  	})
	  }

	  $scope.orderBooks = function(){
	  	dataservice.postOrder(function(res){
	  		$scope.orderStatus = true;
				$scope.getRecommendations();
	  	})
	  }

	  $scope.getRecommendations = function() {
	  	$scope.recommendedBooks = dataservice.topSellers;
	  }

	  $scope.deleteBook = function(isbn13){
	  	dataservice.deleteBook(isbn13, function(res){
	  			$scope.getCart();
	  	});
	  }

		$scope.update();
	}]);
})();