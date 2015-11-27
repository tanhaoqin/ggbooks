var app = angular.module('ggbooks', ['ui.router'])
	.filter('range', function(){
		return function(n){
			var res = [];
			for (var i = 0; i < n; i++){
				res.push(i);
			}
			return res;
		};
	});

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/partials/home.ejs',
				controller: 'MainCtrl'
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
			});
		$urlRouterProvider.otherwise('home');
	}]);

app.factory('auth', ['$http','$window', function($http, $window){
	var auth = {};
	var observers = [];

	auth.register = function(callback){
		observers.push(callback);
	};

	auth.notify = function(){
		angular.forEach(observers, function(callback){
			callback();
		});
	}

	auth.saveToken = function(token){
		$window.localStorage['ggbooks-token'] = token;
	};
	auth.getToken = function(){
		return $window.localStorage['ggbooks-token'];
	};
	auth.isLoggedIn = function(){
		var token = auth.getToken();
		if (token) {
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		}
	};
	auth.currentUser = function(){
		if (auth.isLoggedIn()){
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.username;
		}
	};
	auth.register = function(user){
		return $http.post('/register', user).success(function(data){
			auth.saveToken(data.token);
		});
	};
	auth.logIn = function(user){
		console.log(user);
		return $http.post('/login', user).success(function(data){
			auth.saveToken(data.token);
			auth.notify();
		});
	};
	auth.logOut = function(){
		$window.localStorage.removeItem('ggbooks-token');
		auth.notify();
	};
	return auth;
}]);

app.factory('cart', ['$http', 'auth', function($http, auth){
	var o = {};

	o.cart = [{
		author: "Neil Gaimen",
		title: "American Gods",
		rating: 5
	},{
		author: "Neil Gaimen",
		title: "American Gods",
		rating: 4
	},{
		author: "Neil Gaimen",
		title: "American Gods",
		rating: 3
	}];

	o.featuredBook = [];

	o.getBook = function(isbn13, callback){
		$http.get('/api/book',
			{	
				params: {ISBN: isbn13},
				headers: {Authorization: 'Bearer '+auth.getToken()}
			}
			).success(
  		function(res){
  			o.featuredBook = res;
  			callback();
  		});
	};
	return o;
}]);

app.controller('MainCtrl', [
	'$scope',
	'cart',
	function($scope, cart){
	  $scope.cart = cart.cart;
	  $scope.featuredBook = cart.featuredBook;
	  
	  $scope.range = function(num){
	  	return new Array(num);
	  }

	  $scope.addBook = function(){
	  	if(!$scope.title || $scope.title === '') { return; }
	  	$scope.cart.push($scope.title);
	  	$scope.title = 0;
	  }

	  $scope.getBook = function(){
	  	if (!$scope.isbn13 || $scope.isbn13 === ''){ return; }
	  	cart.getBook($scope.isbn13, function(){
	  		console.log(cart.featuredBook);
		  	$scope.featuredBook.push(cart.featuredBook);
	  	});
	  };

}]);

app.controller('AuthCtrl', [
	'$scope',
	'$state',
	'auth',
	function($scope, $state, auth){
		$scope.user = {};
		$scope.register = function(){
			auth.register($scope.user).error(function(error){
				$scope.error = error;
			}).then(function(){
				$state.go('home');
			});
		};
		$scope.logIn = function(){
			auth.logIn($scope.user).error(function(error){
				$scope.error = error;
			}).then(function(){
				$state.go('home');
			})
		};
	}])

app.controller('NavCtrl', [
	'$scope', 
	'auth',
	function($scope, auth){
		$scope.isLoggedIn = auth.isLoggedIn;
		$scope.currentUser = auth.currentUser;
		$scope.logOut = auth.logOut;
		$scope.update = function(){
			$scope.isLoggedIn = auth.isLoggedIn;
		}
		auth.register($scope.update);
	}]);
