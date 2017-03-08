'use strict';
const Promise = require('bluebird');
const _ =require('lodash');

module.exports = function (Bookmark) {
    Bookmark.list = (include,accessToken, limit, skip) => {
        if ((!(accessToken && accessToken.userId))) {
            return (new Error('need login in'));
        }
        let userId = accessToken.userId;

        return Bookmark.find({
            include:"bookmarkUser",
            where: {
                or: [{
                    type: 'public'
                }, {
                    userId
                }],
            },
            order: "createTime desc,id desc",
            limit: limit,
            skip: skip
        });
    }

    Bookmark.remoteMethod(
        'list', {
            http: {
                path: '/list',
                verb: 'get'
            },
            accepts: [
                {
                    arg: 'include',
                    type:'string'
                },
                {
                    arg: 'accessToken',
                    type: 'object',
                    http: function (ctx) {
                        return ctx.req.accessToken;
                    }
                },
                { 'arg': 'limit', type: 'string' },
                { 'arg': 'skip', type: 'string' }
            ],
            returns: {
                arg: 'list',
                type: 'array'
            }
        }
    )

    Bookmark.listCount = (accessToken) => {
        if ((!(accessToken && accessToken.userId))) {
            return (new Error('need login in'));
        }
        let userId = accessToken.userId;
        let app = Bookmark.app;
        return Bookmark.count({
            'or': [{
                'type': 'public'
            }, {
                'userId': userId
            }],
        })
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

    Bookmark.observe('before delete', (ctx, next) => {
        let deleteId = ctx.where.id;
        let userId = ctx.options.accessToken && ctx.options.accessToken.userId;
        Bookmark.findById(deleteId, {
            fields: {
                userId: true
            }
        }).then(instance => {
            // console.log(instance);
            if (instance) {
                if (instance.userId !== userId) {
                    let error = new Error('No access to do that');
                    error.status = 403;
                    next(error);
                } else {
                    next();
                }
            } else if (err) {
                next(err);
            } else {
                next();
            }
        }).catch(err=>{
            next(err);
        })

    })
};
