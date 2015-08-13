var postschema = require('../model/postschema.js'),
    dbConnection = require('../config/mongoconnect.js');


var getPostContent = function (req, res) {

    dbConnection.connect();
    console.log(req.body.skip);

    postschema.find(function (err, data) {

        if (err) {
            console.log(err);
            dbConnection.close();
            res.send();
        } else {
            console.log("------------------");
            console.log(data);
            console.log("--------------------");
            dbConnection.close();
            res.send(data);
        }


    }).limit(req.body.limit).skip(req.body.skip).sort({
        $natural: -1
    });
}

module.exports = getPostContent;