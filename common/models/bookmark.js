'use strict';

module.exports = function (Bookmark) {
    Bookmark.list = (accessToken, limit, cb) => {
        if ((!(accessToken && accessToken.userId))) {
            cb(new Error('need login in'));
        }
        let userId = accessToken.userId;
        let app = Bookmark.app;
        Bookmark.find({
            "where": {
                'or': [{
                    'type': 'public'
                }, {
                    'userId': userId
                }]
            },
            order:"createTime desc,id desc",
            limit
            // "include": {
            //     "relation": "users",
            //     "scope":{
            //         "fields": ["username"],
            //         "where":{
            //             "id":userId
            //         }
            //     }
            // }
        }, cb)
    }

    Bookmark.remoteMethod(
        'list', {
            http: {
                path: '/list',
                verb: 'get'
            },
            accepts: [
                {
                    arg: 'accessToken',
                    type: 'object',
                    http: function (ctx) {
                        return ctx.req.accessToken;
                    }
                },
                { 'arg': 'limit', type: 'string' }
            ],
            returns: {
                arg: 'list',
                type: 'array'
            }
        }
    )
};
