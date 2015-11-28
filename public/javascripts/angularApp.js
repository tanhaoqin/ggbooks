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

app.factory('auth', ['$http','$window', function($http, $window){
	var auth = {};
	var observers = [];

	auth.subscribe = function(callback){
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

app.factory('recommendations', ['$http', 'auth', function($http, auth){
	var o = {};

	o.topSellers = [{
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

	o.getRecommendations = function(){
		return o.topSellers;
	};

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

app.factory('searchResults', ['$http', 'auth', function($http, auth){
	var o = {};

	o.search = [{
		author: "Neil Gaiman",
		title: "American Gods",
		rating: 4,
		price: 10,
		imageUrl: "http://spinoff.comicbookresources.com/wp-content/uploads/2011/03/american-gods.jpg" 
	},{
		author: "Tan Hao Qin",
		title: "How to get full marks in ML",
		rating: 5,
		price: 1000,
		imageUrl: "http://img6a.flixcart.com/image/book/9/5/2/machine-learning-400x400-imadhxzhxbzjffa4.jpeg" 
	},{
		author: "J.K. Rowling",
		title: "Hairy Pot",
		rating: 3,
		price: 20,
		imageUrl: "http://www.jkrowling.com/uploads/images/large/en_US-timeline-image-harry-potter-and-the-deathly-hallows-1333632499.jpg" 
	}];

	o.getSearchResults =  function() {
		return o.search;
	};

	o.getSearchBooks = function(searchString, callback) {
		$http.get('/api/books', 
		{
			params: {search:searchString},
			headers: {Authorization: 'Bearer '+auth.getToken()}
		}
		).success(
		function(res){
			// o.search = res;
			callback();
		});
	};
	return o;
}]);

app.controller('SearchCtrl' , [
	'$scope',
	'auth',
	'searchResults',
	function($scope, auth, searchResults) {
		$scope.update = function(){
			$scope.currentUser = auth.currentUser();
			$scope.featured = searchResults.getSearchResults();
		}
		$scope.update();

		$scope.range = function(num){
	  	return new Array(num);
	  }
	}

]);

app.controller('HomeCtrl', [
	'$scope',
	'auth',
	'recommendations',
	function($scope, auth, recommendations){

	  $scope.update = function(){
  		  $scope.isLoggedIn = auth.isLoggedIn();
  	  	  console.log(auth.isLoggedIn());
		  if ($scope.isLoggedIn){
		  	$scope.currentUser = auth.currentUser();
		  	$scope.featured = recommendations.getRecommendations($scope.currentUser);
		  } else {
		  	$scope.featured = recommendations.topSellers;
		  }	  	
	  }
	  $scope.update();
	  auth.subscribe($scope.update);

	  $scope.featuredBook = recommendations.featuredBook;
	  
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
	}]);

app.controller('NavCtrl', [
	'$scope', 
	'$state',
	'recommendations',
	'auth',
	function($scope, $state, recommendations, auth){
		$scope.isLoggedIn = auth.isLoggedIn;
		$scope.currentUser = auth.currentUser;
		$scope.logOut = auth.logOut;
		$scope.update = function(){
			$scope.isLoggedIn = auth.isLoggedIn;
		};
		$scope.featuredBook = recommendations.featuredBook;

		$scope.getBook = function() {
	  	if (!$scope.isbn13 || $scope.isbn13 === ''){ return;}
	  	recommendations.getBook($scope.isbn13, function(){
	  		console.log(recommendations[0]);
		  	$scope.featuredBook.push(recommendations[0]);
		  	$state.go('search');
	  	})
	  };
		auth.subscribe($scope.update);
	}]);
