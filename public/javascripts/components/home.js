(function(){
	var home = angular.module('ggbooks.home', []);

	home.controller('HomeCtrl', [
	'$scope',
	'auth',
	'dataservice',
	function($scope, auth, dataservice){

	  $scope.update = function(){
  		  $scope.isLoggedIn = auth.isLoggedIn();
  	  	  console.log(auth.isLoggedIn());
		  if ($scope.isLoggedIn){
		  	$scope.currentUser = auth.currentUser();
		  	$scope.featured = dataservice.getRecommendations($scope.currentUser);
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

}]);
})();