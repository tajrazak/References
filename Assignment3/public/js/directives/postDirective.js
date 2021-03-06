app.directive('mydir', ['$http', '$compile', '$timeout', 'addClientPost', 'checkPostTime', function ($http, $compile, $timeout, addClientPost, checkPostTime) {


  var tempvalue = 0;

  var template1 = "<div class='panel panel-primary' ng-repeat='showdata in userdata' ng-init='showdata.commentlimit=3'><div class='panel-heading'><img src='/Twity' alt='image' class='img-circle'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label><h4>{{showdata.post_profilename}}</h4></label></div><div class='panel-body'><p><b>{{showdata.content}}</b></p></div><div class='panel-footer'>",

    template2 = "<div ng-repeat='comments in showdata.comments | limitTo:showdata.commentlimit'><hr><label>{{comments.username}}:-</label>{{comments.comment }}</br></div>",
    template3 = "<br><div class='input-group'><input type='text' class='form-control' ng-model='showdata.comment' placeholder='Add your comment........'><span class='input-group-btn'><button class='btn btn-info' ng-click='saveComment(showdata)'>comment</button></span></div>",

    template4 = "<br><a href='' ng-click='updateCommentsLimit(showdata)' class='fa fa-comments-o fa-lg'></a>&nbsp;({{showdata.comments.length}})&nbsp;&nbsp;&nbsp;<a href='' target = '_self' ng-click='countLike(showdata)' ng-show='tab=checkForUser(showdata.likes)' class='fa fa-thumbs-up fa-lg'></a>",

    template5 = "<a href='' target = '_self'  ng-click='uncountLike(showdata)' ng-hide='tab'  class='fa fa-thumbs-down fa-lg'></a>&nbsp;( {{showdata.likes.length}})</div></div></div>";

  return {

    restrict: 'E',
    controller: function ($scope) {

      var content = $compile(template1 + template2 + template3 + template4 + template5)($scope);

      $scope.$on('postedData', function (event, data) {
        console.log("controller data " + data);
        console.log(data)

        $scope.storedData = data;
        $scope.setPost(); //calls the setPost method in link function......................

      })


      //it is call from the homeActionCtrl socket.on "updatePost"..........

      $scope.$on('socketContent', function (event, data) {
        console.log("controller data " + data);
        console.log(data)

        addClientPost.addOnlinePosts($scope, data); //it call the addOnlinePosts service and it passes the scope and data as a parameters.....

      })



    },




    link: function (scope, elem, attr) {




      var skiplimit = 0;
      var content = $compile(template1 + template2 + template3 + template4 + template5)(scope);


      //adding the posts when window loading...............

      $http.post('/getPostContent', {
        limit: 3,
        skip: 0
      }).success(function (data) {

        //console.log("onload data " + data)
        if (data.length !== 0) {

          scope.userdata = data;
          checkPostTime.calculateTheNoOfDays(data, scope)
          elem.prepend(content)

        }
      });








      //it sets the new post on the webpage .......................

      scope.setPost = function () {


        if (scope.userdata) {
          //console.log(scope.storedData[0]);
          scope.userdata.unshift(scope.storedData[0]);
          // console.log(scope.userdata)
          //elem.append(content);
          skiplimit += 1;
        } else {


          scope.userdata = scope.storedData; //when posts are empty it is come into this else part............................
          elem.append(content);

        }

      }



      //adding the posts when window loading...............

      $(window).scroll(function () {



        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {


          //this condition checking the scroll bars positions because the  progress bar added...............
          if ($(window).scrollTop() - tempvalue != 40) {

            skiplimit += 3;
            $http.post('/getPostContent', {
              limit: 3,
              skip: skiplimit
            }).success(function (data) {

              //console.log("------------------")
              // console.log(data)
              //console.log("-------------------")
              if (data.length !== 0) {
                scope.showProgress = true;

                console.log("top" + $(window).scrollTop())
                console.log($(document).height() - $(window).height())
                $timeout(function () {
                  scope.showProgress = false;
                  for (i in data) {
                    console.log("timeout function")
                    scope.userdata.push(data[i]);

                  }


                }, 1000)


                // console.log(scope.userdata)

                // elem.append(content)
              } else if (data.length === 0) {
                scope.showProgress = false;
                console.log(scope.showProgress)
              }
            })
          }

          //here the scroll top value added to the temparory variable...................
          tempvalue = $(window).scrollTop();



        }



      })

    }

  }





}]);