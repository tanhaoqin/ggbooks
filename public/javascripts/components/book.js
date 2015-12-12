(function(){
	var home = angular.module('ggbooks.book', []);

	home.controller('BookCtrl', [
	'$scope',
	'$stateParams',
	'$timeout',
	'dataservice',
	function($scope, $stateParams, $timeout, dataservice){

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
				if($scope.book.fb_sub == 1){
					$scope.feedbackSubmitted = true;
				}
			});
			$scope.feedbackCount = 5;
			$scope.getFeedback(1,5);
		};

		$scope.getFeedback = function(start, count){
			dataservice.getFeedback($scope.bookId, start, start + count - 1, function(res){
				$scope.feedbacks = res.feedback;
				$scope.ratings = res.rating;
				for (var i = 0; i < $scope.feedbacks.length; i++){
					$scope.feedbacks[i].rating = null;
					for (var j = 0; j < $scope.ratings.length; j++){
						if($scope.feedbacks[i].fbID == $scope.ratings[j].fbID){
							$scope.feedbacks[i].rating = $scope.ratings[j].usefulness;
						}
					}
				}
			});
		};

		$scope.updateQuantity = function(){
			$scope.displayedPrice = (parseFloat($scope.book.price) * $scope.qtySelected).toFixed(2);
		};

		$scope.init();

		$scope.range = function(num){
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

		$scope.postFeedbackRating = function(rating, feedback, user){

			dataservice.postFeedbackRating({
				"rating": rating, "feedback": feedback, "user": user},
				function(){
					for (var i = 0; i < $scope.feedbacks.length; i++){
						if ($scope.feedbacks[i].fbID == feedback){							
							$scope.feedbacks[i].rating = rating;
						}
					}
				});

		}

		$scope.postFeedback = function(){
			dataservice.postFeedback({
				"score": $scope.feedback.score,
				"comment": $scope.feedback.comment,
				"isbn13": $scope.bookId
			}, function(){
				$timeout(function(){
					$scope.feedbackWaiting = false;
					$scope.feedbackSubmitted = true;
				}, 1500);
			}, function(err){
				$scope.feedbackWaiting = false;
			});
			$scope.feedbackWaiting = true;
		}

		$scope.expand = function(){
			$scope.show = true;
		}

		$scope.hide = function(){
			$scope.show = false;
		}

		$scope.addToCart = function(){
			dataservice.postCart({
				"isbn13": $scope.bookId,
				"quantity": $scope.qtySelected
			}, function(){
				$timeout(function(){
					$scope.cartWaiting = false;
				}, 1500);
			}, function(err){
				$scope.cartWaiting = false;
			});
			$scope.cartWaiting = true;
		}

	}]);

})();