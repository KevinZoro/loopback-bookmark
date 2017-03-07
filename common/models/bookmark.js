'use strict';

module.exports = function (Bookmark) {
    Bookmark.list = (accessToken, limit, skip,cb) => {
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
                }],
            },
            order:"createTime desc,id desc",
            limit:limit,
            skip:skip
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
                { 'arg': 'limit', type: 'string' },
                { 'arg': 'skip', type: 'string'}
            ],
            returns: {
                arg: 'list',
                type: 'array'
            }
        }
    )

    Bookmark.listCount = (accessToken, cb) => {
        if ((!(accessToken && accessToken.userId))) {
            cb(new Error('need login in'));
        }
        let userId = accessToken.userId;
        let app = Bookmark.app;
        Bookmark.count({
            'or': [{
                'type': 'public'
            }, {
                'userId': userId
            }],
        }, cb)
    }

    Bookmark.remoteMethod(
        'listCount', {
            http: {
                path: '/list/count',
                verb: 'get'
            },
            accepts: [
                {
                    arg: 'accessToken',
                    type: 'object',
                    http: function (ctx) {
                        return ctx.req.accessToken;
                    }
                }
            ],
            returns: {
                arg: 'count',
                type: 'number'
            }
        }
    )
};
