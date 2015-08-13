app.controller('loginCtrl', function ($scope, $http, $location) {



  $http.get('/checkForSession').success(function (data) {


    if (data)
      $location.path("/home");
  })

  $scope.formdata = {}

  $scope.checkValidation = function () {
    //  var name = $scope.data.loginUsername,
    //password = $scope.data.loginPassword;
    // console.log($scope.data);
    $http.post("/getData", $scope.formdata).success(function (data) {

      if (data == false) {
        $scope.tab = true;

      } else {
        $location.path("/home");
      }

    }).error(function () {
      console.log("error in login");
    });
  };

})