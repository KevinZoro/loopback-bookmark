module.exports = function(server) {
  var moment = require('moment');
  var remotes = server.remotes();
  // modify all returned values
  function __resultFormat(objects){
    //   console.log(typeof objects);
    //   console.log(objects instanceof Array);
      if(typeof objects == 'object' && objects instanceof Array){
          objects.forEach((value,key)=>{
              value=__resultFormat(value);
          })
      }else{
        for(let key in objects){
            if(key == 'createTime'){
                objects[key] = moment(new Date(objects[key])).format('YYYY-MM-DD HH:mm:ss');
            }
        }
      }
      return objects;
  }
  remotes.after('**', function (ctx, next) {
    // console.log(ctx.result);
    ctx.result = __resultFormat(ctx.result);
    // console.log(ctx.result);
    next();
  });
};