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
                $scope.searchArray = dataservice.getSearchResults();
            }
            $scope.update();
            // $scope.featuredBook = dataservice.featuredBook;

            $scope.range = function(num) {
                return new Array(num);
            }

            $scope.goToBook = function(isbn13) {
                $stateParams.bookId = isbn13;
                $state.go('book');
            }
            $scope.sortArray = function() {
                if ($scope.sortingStyle == "Normal") {
                    $scope.searchArray = dataservice.getSearchResults();
                } 
                else if ($scope.sortingStyle == "Year") {
                	$scope.searchArray = _.sortBy($scope.searchArray, "year")
                }
                else {
                	$scope.searchArray = _.sortBy($scope.searchArray, "avgScore")

                }
            }
        }
    ]);
})();