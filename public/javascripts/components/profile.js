(function(){
	var profile = angular.module('ggbooks.profile', []);

	profile.controller('ProfileCtrl' , [
	'$scope',
	'$state',
	'$stateParams',
	'$timeout', 
	'auth',	
	'dataservice',
	function($scope, $state, $stateParams, $timeout, auth, dataservice) {
		$scope.init = function(){
			$scope.user = auth.currentUser();
			$scope.passnew = "";
			$scope.passre = "";
			$scope.getUser();
		};

		$scope.getUser = function(){
			dataservice.getUser(function(res){
				$scope.profile = res.user[0];
				$scope.orders = {};
				for (var i = 0; i < res.orders.length; i++){
					console.log(res.orders);
					var order = res.orders[i];
					console.log(!(order.orderid in $scope.orders))
					if (!(order.orderid in $scope.orders)){
						$scope.orders[order.orderid] = {}
						$scope.orders[order.orderid].id = "000000".substring(order.orderid.toString().length)+order.orderid.toString();
						$scope.orders[order.orderid].status = order.status;
						$scope.orders[order.orderid].date = order.date;
						$scope.orders[order.orderid].totalcost = order.totalcost;
						$scope.orders[order.orderid].creditcard = order.creditcard;
						$scope.orders[order.orderid].items = []
					}
					$scope.orders[order.orderid].items.push({
						"isbn13": order.isbn13,
						"title" : order.title,
						"author" : order.author,
						"url" : order.image_url,
						"price" : order.price,
						"qty" : order.quantity
					});
				}
				console.log($scope.orders);
				$scope.feedbacks = res.feedback;
				$scope.own_feedback = res.own_feedback;
				// console.log($scope.profile);
			});
		};

		$scope.countFullStars = function(num){
			return new Array(parseInt(num/2));
		}

		$scope.countHalfStars = function(num){
			return new Array(parseInt(num%2));
		}

		$scope.countEmptyStars = function(num){
			return new Array(5 - parseInt(parseInt(num)/2) - parseInt(num%2));
		}

		$scope.updateProfile = function(){
			dataservice.putUser({
				"fullname": $scope.profile.name,
				"creditcard": $scope.profile.creditcard,
				"address": $scope.profile.shipping_address,
				"phonenum": $scope.profile.phone,
			}, function(){
				$timeout(function(){
					$scope.profileWaiting = false;
					$scope.profileSuccess = true;
					$timeout(function() {
						$scope.profileSuccess = false;						
					}, 1500);
				}, 1500);
			});
			$scope.profileWaiting = true;
		}

		$scope.changePassword = function(){
			if ($scope.passre != $scope.passnew&&$scope.passre!=null){
			} else {
				dataservice.putPassword({
					"oldpw": $scope.passold,
					"newpw": $scope.passnew
				}, function(){
					$timeout(function(){
					$scope.pwWaiting = false;
					$scope.pwSuccess = true;
					$timeout(function() {
						$scope.pwSuccess = false;						
					}, 1500);
				}, 1500);
				});
				$scope.pwWaiting = true;
			}
		}

		$scope.init();
	}]);
})();