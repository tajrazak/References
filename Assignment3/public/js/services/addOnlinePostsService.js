app.service('addClientPost', function () {


    return {


        addOnlinePosts: function (scope, data) {
            scope.$apply(function () {
                scope.storedData = data;
                scope.setPost(); //calls the directives setPost method in link function......................

            })

        }
//
//
//                addCommentToRelatePost: function (scope, data) {
//
//                    //            console.log(data);
//                    //            var obj = scope.userdata.filter(function (e) {
//                    //                return e._id === data._id
//                    //            });
//
//
//                    //console.log(obj.comments)
//
//                    scope.$apply(function () {
//                        for (i in scope.userdata) {
//                            if (i._id === data._id) {
//                                scope.userdata.comments = data.comments;
//                            }
//                        }
//
//                    })
//
//
//
//                }

    }



})