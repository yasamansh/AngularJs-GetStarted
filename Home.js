var app = angular.module("githubviewer", []);
app.controller('apiCall', function ($scope, github, $interval, $log, $anchorScroll, $location) {

    $scope.search = function (username) {
        $log.info("Searching for " + username);
        github.getUser(username).then(function success(data) {
                 if (countdownInterval) {
                     $interval.cancel(countdownInterval);
                     $scope.countdown = null;
                 }
                 $scope.user = data;
                 github.getRepos($scope.user).then(function success(data) {
                         $scope.repos = data;
                         $location.hash("userDetails");
                         $ancherScroll();
                     }, function error(response) {
                         $scope.message = "Could not get the Repos information";
                     })
             }, function error(response) {
                 $scope.message = "Could not fetch the data";
             });
         $scope.repoSortOrder = "-stargazers_count";
    }

     var decrementCountdown = function () {
         $scope.countdown -= 1;
         if ($scope.countdown < 1) {
             $scope.search($scope.username);
         }
     };
     var countdownInterval = null;
     var startCountdown = function () {
         countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
     };

     $scope.username = "angular";
     $scope.countdown = 5;
     startCountdown();
});