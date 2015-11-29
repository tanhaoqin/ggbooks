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
			});
		$urlRouterProvider.otherwise('home');
	}]);
	
})();