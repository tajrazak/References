app.service('socketObjService', function () {

    var socket = io.connect();

    return {

        getSocketConn: function () {

            return socket;
        }

    }

})