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
				resolve:{
				      bookId: function($stateParams){
			      		console.log($stateParams.bookId);
				          return $stateParams.bookId;
				      }
				   },
				url: '/book/:bookId',
				templateUrl: 'partials/book.ejs',
				controller: 'BookCtrl'
			});
		$urlRouterProvider.otherwise('home');
	}]);
	
})();