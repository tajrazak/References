var postSchema = require('../model/postschema.js'),
    dbConnection = require('../config/mongoconnect.js');

var savePost = function (request, response, next) {

    //console.log(request.body.post_id);


    dbConnection.connect()

    var InsertData = new postSchema({

        user_id: request.session.userid,
        post_profilename: request.session.profilename,
        content: request.body.content,
        post_date: new Date()
    })

    InsertData.save(function (err, data) {
        if (err) {
            console.log(err)
            dbConnection.close();
            response.send(false);
        } else {

            dbConnection.close();
            next();
        }

    })


}

module.exports = savePost;