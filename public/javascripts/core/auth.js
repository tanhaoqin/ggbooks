(function(){
	var core = angular.module('ggbooks.core');

	core.factory('auth', ['$http','$window', function($http, $window){
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
			console.log("token saved");
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
		auth.isAdmin = function(){
			if (auth.isLoggedIn()){
				var token = auth.getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload.type == "a";
			}
		};
		auth.register = function(user){
			return $http.post('/register', user).success(function(data){
				console.log(data);
			});
		};
		auth.logIn = function(user){
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

	core.controller('AuthCtrl', [
		'$scope',
		'$state',
		'auth',
		function($scope, $state, auth){
			$scope.user = {};
			$scope.trackRegister = function(data){
				console.log(data);
			}
			$scope.register = function(){
				if($scope.user.password!=$scope.password){
					$scope.error = {"message": "Password does not match."}
				} else{
					auth.register($scope.user).error(function(error){
					$scope.error = error;
				}).then(function(){
					$scope.logIn();
				});
				}	
			};
			$scope.logIn = function(){
				auth.logIn($scope.user).error(function(error){
					$scope.error = error;
				}).then(function(){
					$state.go('home');
				})
			};
		}]);
})();