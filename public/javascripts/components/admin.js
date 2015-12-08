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
                    console.log($scope.book);
                });
            };

            $scope.insertBook = function(title, isbn, author, format, price, publisher, summary, quantity, year, url, subject) {
            	var bookFormat = format == 'Hardcover' ? 'H' : 'P';
                var book = {
                    'title': title,
                    'ISBN13': isbn,
                    'author': author,
                    'format': bookFormat,
                    'price' : price,
                    'publisher': publisher,
                    'summary': summary,
                    'quantity': quantity,
                    'image_url': url,
                    'subject': subject,
                    'year': year
                };
                dataservice.insertBook(book, function(res) {
                    console.log(res);
                })
            };

            $scope.init();
        }
    ]);
})();