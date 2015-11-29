(function(){
	var home = angular.module('ggbooks.book', []);

	home.controller('BookCtrl', [
	'$scope',
	'$stateParams',
	'dataservice',
	function($scope, $stateParams, dataservice){

		$scope.init = function(){
			$scope.bookId = $stateParams.bookId
			dataservice.getBook($scope.bookId, function(res){
				$scope.book = res;
				$scope.qty = 1;
				$scope.displayedPrice = parseFloat($scope.book.price) * $scope.qty;
				console.log(res);
			});
		}

		$scope.updateQuantity = function(qty){
			$scope.qty = qty;
			$scope.displayedPrice = (parseFloat($scope.book.price) * $scope.qty).toFixed(2);
		}

		$scope.range = function(num){
			return new Array(num);
		}

		$scope.init();

	}]);

})();