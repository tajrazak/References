var postschema = require('../model/postschema.js'),
    dbConnection = require('../config/mongoconnect.js');


var getPost = function (req, res) {

    dbConnection.connect();

    postschema.find({}, function (err, data) {


        if (err) {
            console.log(err);
            dbConnection.close();
            res.send(false);
        } else {

            dbConnection.close();
            //req.session.postid=data[data.length-1]._id;
            //console.log(data[data.length-1]._id);
            res.send(data);
        }


    }).limit(1).sort({
        $natural: -1
    });

}

module.exports = getPost;