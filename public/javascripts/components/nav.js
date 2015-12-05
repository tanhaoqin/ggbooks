(function(){
	var nav = angular.module('ggbooks.nav', []);
	nav.controller('NavCtrl', [
		'$scope', 
		'$state',
		'dataservice',
		'auth',
		function($scope, $state, dataservice, auth){
			$scope.isLoggedIn = auth.isLoggedIn;
			$scope.currentUser = auth.currentUser;
			$scope.isAdmin = auth.isAdmin;
			$scope.logOut = auth.logOut;
			$scope.update = function(){
				$scope.isLoggedIn = auth.isLoggedIn;
			};
			$scope.featuredBook = dataservice.featuredBook;

			$scope.getBook = function() {
		  	if (!$scope.isbn13 || $scope.isbn13 === ''){ return;}
		  	dataservice.getBook($scope.isbn13, function(){
		  		console.log(dataservice[0]);
			  	$scope.featuredBook.push(dataservice[0]);
			  	$state.go('search');
		  	})
		  };
			auth.subscribe($scope.update);
		}]);
})();