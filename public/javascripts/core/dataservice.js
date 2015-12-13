(function(){
	var core = angular.module('ggbooks.core');

	core.factory('dataservice', ['$http', 'auth', function($http, auth){
		var o = {};

		o.topSellers = [{
			author: "Neil Gaiman",
			title: "American Gods",
			rating: 5,
			isbn13: 9780380973651,
		},{
			author: "Gillian Flynn",
			title: "The Grownup",
			rating: 4,
			isbn13: 9781474603041,
		},{
			author: "Lizzie Mary Cullen",
			title: "The Magical Christmas",
			rating: 3,
			isbn13: 9781405925136
		}];

		o.getRecommendations = function(callback){
			$http.get('/api/recommendation', {
				headers: {Authorization: 'Bearer '+auth.getToken()}
			}).success(function(res){
				callback(res);
			});
		};

		o.getBooks = function(searchString, callback) {
			$http.get('/api/books?search='+searchString, 
			{
				headers: {Authorization: 'Bearer '+auth.getToken()}
			}
			).success(
			function(res){
				o.search = res['book'];
				callback(res);
			});
		};

		o.getPopularBooks = function(quantity,callback){
			$http.get('/api/popular/books?quantity='+quantity)
			.success(function(res){
				callback(res);
			});
		}

		o.getPopularAuthors = function(quantity,callback){
			$http.get('/api/popular/author?quantity='+quantity, 
			{
				headers: {Authorization: 'Bearer '+auth.getToken()
			}				
			}).success(function(res){
				callback(res);
			});
		}

		o.getPopularPublishers = function(quantity,callback){
			$http.get('/api/popular/publisher?quantity='+quantity, 
			{
				headers: {Authorization: 'Bearer '+auth.getToken()
			}				
			}).success(function(res){
				callback(res);
			});
		}

		o.getBook = function(isbn13, callback){
			$http.get('/api/book?isbn13='+isbn13,
				{	
					headers: {Authorization: 'Bearer '+auth.getToken()}
				}
				).success(
	  		function(res){
	  			callback(res);
	  		});
		};

		o.getFeedback = function(isbn13, start, end, callback){
			$http.get('/api/feedback?isbn13='+isbn13+'&start='+start+'&end='+end, {
				headers: {Authorization: 'Bearer '+auth.getToken()}				
			}).success(function(res){
				callback(res);
			});
		}

		o.postFeedback = function(feedback, callback, error){
			$http.post('/api/feedback', feedback,{
				headers: {Authorization: 'Bearer '+auth.getToken()}
			}).success(function(res){
				callback(res);
			}).error(function(err){
				console.log(err);
			});
		}

		o.postFeedbackRating = function(feedback, callback){
			$http.post('/api/feedback/rating', feedback,
			{
				headers: {Authorization: 'Bearer '+auth.getToken()}
			}
			).success(
			function(res){
				callback(res);
			}).error(
			function(err){
				console.log(err);
			});
		};

		o.postCart = function(data, callback){
			$http.post('/api/cart', data, {
				headers: {Authorization: 'Bearer '+auth.getToken()}
			}).success(function(res){
				callback(res);
			}).error(function(err){
				console.log(err);
			});

		}

		o.getCart = function(callback){
			$http.get('/api/cart', {
				headers: {Authorization: 'Bearer '+auth.getToken()}				
			}).success(function(res){
				callback(res);
			})
		}

		o.postOrder = function(callback){
			$http.post('/api/order', '', {
				headers: {Authorization: 'Bearer '+auth.getToken()}
			}).success(function(res){
				callback(res);
			}).error(function(err){
				console.log(err);
			});
		}

		o.getUser = function(callback){
			$http.get('/api/user', {
				headers: {Authorization: 'Bearer '+auth.getToken()}
			}).success(function(res){
				callback(res);
			});
		}

		o.putUser = function(data, callback){
			$http.put('/api/user', data, {
				headers: {Authorization: 'Bearer '+auth.getToken()}
			}).success(function(res){
				callback();
			});
		}

		o.putPassword = function(data, callback){
			$http.post('/api/password', data, {
				headers: {Authorization: 'Bearer '+auth.getToken()}
			}).success(function(res){
				callback();
			});
		}

		o.insertBook = function(book, callback) {
			$http.post('/api/admin/book', book, {
				headers: {Authorization: 'Bearer '+auth.getToken()}
			}).success(function(res){
				callback(res);
			}).error(function(err){
				console.log(book);
				console.log(err);
			});
		};

		o.updateQuantity = function(quantity, callback) {
			$http.post('/api/admin/book/quantity', quantity, {
				headers: {Authorization: 'Bearer '+auth.getToken()
			}
			}).success(function(res){
				callback(res);
			}).error(function(err){
				console.log(quantity);
				console.log(err);
			});
		};

		o.deleteBook = function(quantity, callback) {
			$http.delete('/api/cart', {
				params: {isbn13:quantity},
				headers: {Authorization: 'Bearer '+auth.getToken()
			}
			}).success(function(res){
				callback(res);
			}).error(function(err){
				console.log(quantity);
				console.log(err);
			});
		};

		o.featuredBook = [];

		o.search = [];

		o.getSearchResults = function() {
			console.log(o.search);
			return o.search;
		};

		return o;
	}]);

})();