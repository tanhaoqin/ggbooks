(function(){
	var home = angular.module('ggbooks.book', []);

	home.controller('BookCtrl', [
	'$scope',
	'$stateParams',
	'dataservice',
	function($scope, $stateParams, dataservice){

		$scope.init = function(){
			$scope.Date = Date;
			$scope.show = false;
			$scope.bookId = $stateParams.bookId
			$scope.qtySelected = 1;
			dataservice.getBook($scope.bookId, function(res){
				$scope.book = res;
				$scope.bookCopies = []
				for (var i = 1; i < $scope.book.copies + 1; i++){
					$scope.bookCopies.push(i);
				}
				console.log($scope.book);
				$scope.displayedPrice = parseFloat($scope.book.price) * $scope.qtySelected;
			});
			$scope.feedbackCount = 5;
		};

		$scope.getFeedback = function(){
			dataservice.getFeedback($scope.feedbackCount, function(res){
				$scope.feedbacks = res;
			});
		};

		$scope.updateQuantity = function(){
			console.log($scope.qty);
			$scope.displayedPrice = (parseFloat($scope.book.price) * $scope.qtySelected).toFixed(2);
		};

		$scope.init();

		$scope.range = function(num){
			console.log(num);
			return new Array(num);
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

		$scope.postFeedbackRating =  function(rating, feedback, user){
			console.log('test', rating, feedback, user);
			dataservice.postFeedbackRating(rating, feedback, user);
		}

		$scope.expand = function(){
			$scope.show = true;
		}

		$scope.hide = function(){
			$scope.show = false;
		}

	}]);

})();