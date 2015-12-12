(function(){
	var home = angular.module('ggbooks.home', []);

	home.controller('HomeCtrl', [
	'$scope',
	'$state',
	'$stateParams',
	'auth',
	'dataservice',
	function($scope, $state, $stateParams, auth, dataservice){

	  $scope.update = function(){
  		  $scope.isLoggedIn = auth.isLoggedIn();
  	  	  console.log(auth.isLoggedIn());
		  if ($scope.isLoggedIn){
		  	$scope.currentUser = auth.currentUser();
		  	$scope.featured = dataservice.topSellers;
		  	// dataservice.getRecommendations(function(res){
		  	// 	if (res.user.length < 6){
		  	// 		var slack = 6 - res.user.length;
		  	// 		dataservice.getPopularBooks(slack, function(res){
		  	// 			console.log(res);
		  	// 		});
		  	// 	} 
		  	// });
		  } else {
		  	$scope.featured = dataservice.topSellers;
		  }	  	
	  }
	  $scope.update();
	  auth.subscribe($scope.update);

	  $scope.featuredBook = dataservice.featuredBook;
	  
	  $scope.range = function(num){
	  	return new Array(num);
	  }

	  $scope.addBook = function(){
	  	if(!$scope.title || $scope.title === '') { return; }
	  	$scope.featured.push($scope.title);
	  	$scope.title = 0;
	  }

	  $scope.getBook = function(){
	  	if (!$scope.isbn13 || $scope.isbn13 === ''){ return; }
	  	recommendations.getBook($scope.isbn13, function(){
	  		console.log(recommendations.featuredBook);
		  	$scope.featuredBook.push(recommendations.featuredBook);
	  	});
	  };

	  $scope.goToBook = function(isbn13){
	  	$stateParams.bookId = isbn13;
	  	$state.go('book');
	  }
	}]);
})();