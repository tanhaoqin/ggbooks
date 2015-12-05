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
			$scope.bookId = $stateParams.bookId
			$scope.qtySelected = 1;
			dataservice.getProfile($scope.bookId, function(res){
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

	}]);
})();