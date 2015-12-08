(function() {
    var search = angular.module('ggbooks.search', []);

    search.controller('SearchCtrl', [
        '$scope',
        '$state',
        '$stateParams',
        'auth',
        'dataservice',
        function($scope, $state, $stateParams, auth, dataservice) {
            $scope.update = function() {
                $scope.currentUser = auth.currentUser();
                $scope.featured = dataservice.getSearchResults();
            }
            $scope.update();
            $scope.featuredBook = dataservice.featuredBook;

            $scope.range = function(num) {
                return new Array(num);
            }

            $scope.goToBook = function(isbn13) {
                $stateParams.bookId = isbn13;
                $state.go('book');
            }
            $scope.sortArray = function() {
                if ($scope.sortingStyle == "Normal") {
                    $scope.featured = dataservice.getSearchResults();
                } 
                else if ($scope.sortingStyle == "Year") {
                	$scope.featured = _.sortBy($scope.featured, "year")
                }
                else {
                	$scope.featured = _.sortBy($scope.featured, "avgScore")

                }
            }
        }
    ]);
})();