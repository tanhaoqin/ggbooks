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

		o.getRecommendations = function(){
			return o.topSellers;
			//$http.get('/api/recommendations')
		};

		o.getBooks = function(searchString, callback) {
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

		o.getCart = function(){

			//$http.get('/api/cart')
		}

		o.postOrder = function(){

			//$http.post('/api/order')
		}

		o.getUser = function(callback){
			$http.get('/api/user', {
				headers: {Authorization: 'Bearer '+auth.getToken()}
			}).success(function(res){
				callback(res);
			})
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

		o.featuredBook = [];

		o.search = [{
			author: "Neil Gaiman",
			title: "American Gods",
			rating: 4,
			price: 10,
			imageUrl: "http://spinoff.comicbookresources.com/wp-content/uploads/2011/03/american-gods.jpg",
			isbn13: 9781405925136, 
			year: 2015

		},{
			author: "Tan Hao Qin",
			title: "How to get full marks in ML",
			rating: 5,
			price: 1000,
			imageUrl: "http://img6a.flixcart.com/image/book/9/5/2/machine-learning-400x400-imadhxzhxbzjffa4.jpeg",
			isbn13: 9781405925136,
			year: 2013
		},{
			author: "J.K. Rowling",
			title: "Hairy Pot",
			rating: 3,
			price: 20,
			imageUrl: "http://www.jkrowling.com/uploads/images/large/en_US-timeline-image-harry-potter-and-the-deathly-hallows-1333632499.jpg",
			isbn13: 9781405925136,
			year: 2014
		}];

		o.getSearchResults =  function() {
			return o.search;
		};

		return o;
	}]);

})();