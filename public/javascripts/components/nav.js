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

			$scope.getBooks = function() {
		  	if (!$scope.searchText || $scope.searchText === ''){ return;}
		  	dataservice.getBooks($scope.searchText, function(res){
		  		dataservice.search = res;
			  	$state.go('search');
		  	})
		  };
			auth.subscribe($scope.update);
		}]);
})();