(function(){
	var search = angular.module('ggbooks.search', []);

	search.controller('SearchCtrl' , [
	'$scope',
	'$state',
	'$stateParams',
	'auth',
	'dataservice',
	function($scope, $state, $stateParams, auth, dataservice) {
		$scope.update = function(){
			$scope.currentUser = auth.currentUser();
			$scope.featured = dataservice.getSearchResults();
		}
		$scope.update();
	  $scope.featuredBook = dataservice.featuredBook;

		$scope.range = function(num){
	  	return new Array(num);
	  }

	  $scope.goToBook = function(isbn13){
	  	$stateParams.bookId = isbn13;
	  	$state.go('book');
	  }
	  $scope.sortArray =  function(sortType){
	  	$scope.order = function(predicate, reverse) {
   			 $scope.featured = orderBy($scope.featured, predicate, reverse);
  		};
  		$scope.order(sortType,false);
		}
	}]);
})();