app.controller('signupcontroller', function ($scope, $http, $location) {


  $http.get('/checkForSession').success(function (data) {


    if (data)
      $location.path("/home");

  })




  $scope.displayErrorresult = true;

  $scope.signupUserData = {
    gender: 'default'
  }

  $scope.signupAction = function () {

    if ($scope.signupUserData.password1 !== $scope.signupUserData.password2 || $scope.signupUserData.password1 == undefined || $scope.signupUserData.password2 == undefined) {

      $scope.errorDisplay = true;

    } else {
      $scope.errorDisplay = false;

    }

    if ($scope.signupUserData.gender == 'default') {

      $scope.errorGenderDisplay = true;
    } else {
      $scope.errorGenderDisplay = false;

    }
    if ($scope.signupUserData.email == undefined) {

      $scope.erroremailDisplay = true;
    } else {

      $scope.erroremailDisplay = false;
    }
    if ($scope.signupUserData.Name == undefined) {
      $scope.errorNameDisplay = true;
    } else {

      $scope.errorNameDisplay = false;
    }

    if (!$scope.errorNameDisplay && !$scope.errorNameDisplay && !$scope.erroremailDisplay && !$scope.errorGenderDisplay && !$scope.errorDisplay) {

      $http.post('/newUser', $scope.signupUserData).success(function (data) {

        console.log(data)
        if (data == false) {
          console.log(data);
          $scope.displayErrorresult = data;
        } else {
          $scope.signupUserData = {};
          $scope.displayErrorresult = data;
        }
      })

    } else {
      console.log("Data is not Posted" + "  " + $scope.errorNameDisplay + "  " + $scope.errorNameDisplay +
        "  " + $scope.erroremailDisplay +
        "  " + $scope.errorGenderDisplay + " " + $scope.errorDisplay);
    }
  }
})