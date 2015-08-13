var postschema = require('../model/postschema.js'),
    dbConnection = require('../config/mongoconnect.js');


var saveComments = function (req, res) {

    console.log("coments------------------------------------------------------------------")

    console.log(req.body.comment);
    console.log(req.body._id)


    var commentObj = {
        username: req.session.profilename,
        comment: req.body.comment,
        comment_date: Date.now()
    }

    dbConnection.connect();

    postschema.findOne({
        _id: req.body._id
    }, function (err, data) {

        if (err) {

            console.log("sorry not saved");


        } else {

            data.comments.push(commentObj);
            data.save(function (err, resultdata) {
                if (err) {
                    dbConnection.close();
                    console.log("sorry not saved");
                    res.send(false);
                } else {
                    //console.log(data)
                    dbConnection.close();
                    res.send(data);
                }


            })

        }


    })
}

module.exports = saveComments;