  mongoose = require('mongoose'),
      module.exports = {
          connect: function () {
              mongoose.connect('mongodb://localhost/Assignment')
              mongoose.connection.once('open', function (callback) {
                  console.log("Connection Established Successfully")
              })
          },

          close: function () {

              mongoose.connection.close();

          }


      }