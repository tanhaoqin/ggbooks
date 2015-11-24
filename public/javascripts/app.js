var app = angular.module('ggbooks', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/partials/home.html',
				controller: 'MainCtrl'
			});

		$urlRouterProvider.otherwise('home');
	}]);

app.factory('cart', [function(){
	var o = {
		cart: ['Book 1', 'Book 2']
	};
	return o;
}]);

app.controller('MainCtrl', [
'$scope',
'cart',
function($scope, cart){
  $scope.cart = cart.cart;

  $scope.addBook = function(){
  	if(!$scope.title || $scope.title === '') { return; }
  	$scope.cart.push($scope.title);
  	$scope.title = 0;
  }

}]);

