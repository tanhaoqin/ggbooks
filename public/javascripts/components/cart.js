(function(){
	var cart = angular.module('ggbooks.cart', []);

	cart.controller('CartCtrl' , [
	'$scope',
	'$state',
	'$stateParams',
	'$timeout',
	'auth',	
	'dataservice',
	function($scope, $state, $stateParams, $timeout, auth, dataservice) {
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
	  		$scope.totalPrice = $scope.totalPrice.toFixed(2);
	  	});
	  }

	  $scope.orderBooks = function(){
	  	dataservice.postOrder(function(res){
	  		$scope.orderStatus = true;
				$scope.getRecommendations();
	  	})
	  }

	  $scope.getRecommendations = function() {
	  	dataservice.getRecommendations(function(res){
		  		if (res.user.length < 6){
		  			var slack = 6 - res.user.length;
		  			dataservice.getPopularBooks(slack, function(res){
		  				$scope.recommendedBooks = res.books;
		  			});
		  		} 
		  	});
	  }

	  $scope.deleteBook = function(isbn13){
	  	dataservice.deleteBook(isbn13, function(res){
					$timeout(function(){
						$scope.cartWaiting = false;
						$scope.itemDeleted = true;
						$timeout(function(){
							$scope.itemDeleted = false;
								 $scope.getCart();
						}, 1500);
					}, 1500);
				}, function(err){
					$scope.cartWaiting = false;
				});
				$scope.cartWaiting = true;
	  }
		$scope.update();
	}]);
})();