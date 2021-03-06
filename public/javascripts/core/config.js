(function(){
	var core = angular.module('ggbooks.core');

	core.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/partials/home.ejs',
				controller: 'HomeCtrl'
			})
			.state('login', {
				url: '/login',
				templateUrl: '/partials/login.ejs',
				controller: 'AuthCtrl',
				onEnter: ['$state', 'auth', function($state, auth){
					if(auth.isLoggedIn()){
						$state.go('home');
					}
				}]
			})
			.state('register', {
				url: '/register', 
				templateUrl: 'partials/register.ejs',
				controller: 'AuthCtrl',
				onEnter: ['$state', 'auth', function($state, auth){
					if(auth.isLoggedIn()){
						$state.go('home');
					}
				}]
			})
			.state('search', {
				url: '/search',
				templateUrl: 'partials/search.ejs',
				controller: 'SearchCtrl'
			})
			.state('book', {
				url: '/book/:bookId',
				templateUrl: 'partials/book.ejs',
				controller: 'BookCtrl'
			})
			.state('cart', {
				url: '/cart',
				templateUrl: 'partials/cart.ejs',
				controller: 'CartCtrl'
			})
			.state('admin', {
				url: '/admin',
				templateUrl: 'partials/admin.ejs',
				controller: 'AdminCtrl'
			})
			.state('profile', {
				url: '/profile',
				templateUrl: 'partials/profile.ejs',
				controller: 'ProfileCtrl'
			});
		$urlRouterProvider.otherwise('home');
	}]);
	
})();