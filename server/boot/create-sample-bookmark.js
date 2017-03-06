'use strict';

module.exports = function(app){
    app.dataSources.mysqlDs.automigrate('bookmark',(err)=>{
        if(err) throw err;

        app.models.bookmark.create([{
            name:'test1',
            content:'https://www.baidu.com',
            userId:1,
            type:"public",
        },{
            name:'test2',
            content:'https://www.baidu.com',
            userId:1,
            type:"private"
        },{
            name:'test3',
            content:'https://www.baidu.com',
            userId:1,
            type:"private"
        }    
        ],(err,bookmark)=>{
            if(err) throw err;
            console.log('Models created: \n', bookmark);
        })
    })
}