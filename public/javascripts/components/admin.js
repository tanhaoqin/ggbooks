(function() {
    var admin = angular.module('ggbooks.admin', []);
    admin.controller('AdminCtrl', [
        '$scope',
        '$state',
        '$stateParams',
        'auth',
        'dataservice',
        function($scope, $state, $stateParams, auth, dataservice) {
            $scope.init = function() {
                $scope.user = auth.currentUser();
                $scope.bookFound = false;
                $scope.popularBookFound = false;
                $scope.popularAuthorFound = false;
                $scope.book = "";
                $scope.popularbooks;
                $scope.popularauthors;
                $scope.popularpublishers;
            };
            $scope.countFullStars = function(num) {
                return new Array(parseInt(num / 2));
            }
            $scope.countHalfStars = function(num) {
                return new Array(parseInt(num % 2));
            }
            $scope.countEmptyStars = function(num) {
                return new Array(5 - parseInt(parseInt(num) / 2) - parseInt(num % 2));
            }
            $scope.getBook = function(isbn) {
                dataservice.getBook(isbn, function(res) {
                    $scope.book = res;
                    $scope.bookFound = true;
                    console.log($scope.book);
                });
            };
            $scope.insertBook = function(title, isbn, author, format, price, publisher, summary, quantity, year, url, subject) {
                var book = {
                    'book': {
                        'title': title,
                        'isbn13': isbn,
                        'author': author,
                        'format': format == 'Paperback' ? 'P' : 'H',
                        'price': price,
                        'publisher': publisher,
                        'summary': summary,
                        'quantity': quantity,
                        'image_url': url,
                        'subject': subject,
                        'year': year
                    }
                }
                dataservice.insertBook(book, function(res) {
                    console.log(book);
                    console.log(res);
                })
            };
            $scope.updateQuantity = function(quantity, isbn) {
                var quantityJSON = {
                    'isbn13': isbn,
                    'quantity': quantity
                }
                dataservice.updateQuantity(quantityJSON, function(res) {
                    console.log(res);
                    dataservice.getBook(isbn, function(res) {
                        $scope.book = res;
                        $scope.bookFound = true;
                    console.log($scope.book);
                    });
                })
            };

            $scope.getPopularBook = function(number) {
                dataservice.getPopularBooks(number, function(res){
                    $scope.popularbooks = res['books'];
                    $scope.popularBookFound = true;
                })
            }

            $scope.getPopularAuthor = function(number) {
                dataservice.getPopularAuthors(number, function(res){
                    $scope.popularauthors = res['books'];
                    $scope.popularAuthorFound = true;
                })
            }

            $scope.getPopularPublisher = function(number) {
                dataservice.getPopularPublishers(number, function(res){
                    $scope.popularpublishers = res['books'];
                    $scope.popularPublisherFound = true;
                })
            }
            $scope.init();
        }
    ]);
})();