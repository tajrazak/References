var checkForSession = function (request, response) {

    if (request.session.userid) {
        response.send(request.session.profilename);
    } else {
        response.send(false);
    }
}

module.exports = checkForSession;