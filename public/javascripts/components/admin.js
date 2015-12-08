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

            $scope.insertBook = function(title, isbn, author, quantity, year, url, subject) {
                var book = {
                    'title': title,
                    'ISBN13': isbn,
                    'author': author,
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