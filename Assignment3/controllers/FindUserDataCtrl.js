var dbConnection = require('../config/mongoconnect.js'),
    userschema = require('../model/userschema.js');
var findUserData = function (request, response) {

    // console.log(request.body.loginEmail)

    dbConnection.connect();
    userschema.findOne({
        email: request.body.loginEmail,
        password: request.body.loginPassword
    }, function (err, data) {
        if (data) {
            console.log(data)
            request.session.userid = data._id;
            request.session.profilename = data.profilename;
            dbConnection.close();
            response.send(true);
        } else {
            dbConnection.close();
            response.send(false)
        }

    })
};

module.exports = findUserData;