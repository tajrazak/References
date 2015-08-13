app.controller('likeCtrl', ['$scope', '$http', 'addClientPost', 'socketObjService', function ($scope, $http, addClientPost, socketObjService) {

  //$scope.commentlimit = 3;

  var socket = socketObjService.getSocketConn();



  $scope.$on('userProfileName', function (event, data) {
    // console.log("in like " + data.profilename);
    $scope.profilename = data.profilename;
  });




  $scope.updateCommentsLimit = function (showdata) {

    showdata.commentlimit += 3;

  }








  $scope.countLike = function (userdataobj) {

    //console.log(obj)
    $http.post('/storelike', userdataobj).success(function (data) {

      if (data) {
        console.log(data.likes.length);
        userdataobj.likes.push($scope.profilename);
        userdataobj.likes.length = data.likes.length; //if we are done any changes in this obj it will be reflect on the view..............(this obj return from front end)
        userdataobj.likeStatus = true;
      } else {
        console.log("error occured while storing like")
      }
    });

  }

  $scope.uncountLike = function (userdataobj) {

    //console.log(obj)
    $http.post('/removelike', userdataobj).success(function (data) {

      if (data) {
        console.log(data.likes.length);
        userdataobj.likes.length = data.likes.length;
        userdataobj.likeStatus = false;
      } else {
        console.log("error occured while removing like")
      }
    });

  }




  $scope.saveComment = function (userdataObj) {
    $http.post('/postComments', userdataObj).success(function (data) {
      if (data) {
        userdataObj.comment = "";
        console.log(data)
        userdataObj.comments = data.comments;
        userdataObj.commentlimit += 1;
      }
    });


  }






  $scope.checkForUser = function (obj) {

    //   console.log(obj)

    var resultObj = obj.filter(function (e) {
      return e === $scope.profilename
    })

    if (resultObj == "") {
      // console.log("hi im form likes" + resultObj)
      return true;
    } else {
      return false;
    }

  }



}])