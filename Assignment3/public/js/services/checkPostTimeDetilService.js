app.service('checkPostTime', function () {
  var current = new Date();

  return {

    calculateTheNoOfDays: function (postDate, scope) {

      //  console.log(postDate)
      for (i in postDate) {

        var startTimeISOString = postDate[i].post_date;
        var startTimeDate = new Date(startTimeISOString); //converting the iso date into GMT format................
        //console.log(startTimeDate.getMinutes())
        //console.log(current.getMinutes())
        if (startTimeDate.getDate() == current.getDate()) {
          if (startTimeDate.getHours() == current.getHours()) {

            if (startTimeDate.getMinutes() == current.getMinutes()) {

              console.log(current.getSeconds() - startTimeDate.getSeconds() + " seconds ago")
              scope.seconds = current.getSeconds() - startTimeDate.getSeconds() + " seconds ago";
            } else if (startTimeDate.getMinutes() != current.getMinutes()) {

              console.log(current.getMinutes() - startTimeDate.getMinutes() + " minutes ago")
              scope.minutes = current.getMinutes() - startTimeDate.getMinutes() + " hours ago";
            }
          } else if (startTimeDate.getHours() != current.getHours()) {
            console.log(current.getHours() - startTimeDate.getHours() + " hours ago")
            scope.hours = current.getHours() - startTimeDate.getHours() + " hours ago";
          }
        } else {
          console.log(current.getDate() - startTimeDate.getDate() + " days ago")
          scope.days = current.getDate() - startTimeDate.getDate() + " days ago";
        }

      }

    }
  }

})