var mongoose = require('mongoose');
var postschema = mongoose.model('posts2',

    {
        user_id: {
            type: String,
            required: true
        },
        post_profilename: {
            type: String
        },

        content: {
            type: String
        },
        comments: [{
            username: {
                type: String
            },
            comment: {
                type: String,

            },
            comment_date: {
                type: Date
            }
        }],
        likes: [],
        post_date: {
            type: Date
        }

    }
)

module.exports = postschema;