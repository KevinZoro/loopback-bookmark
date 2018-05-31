module.exports = function(app){
    let User=app.models.User;
    User.create({email:'test@bar.com',password:'bar'},(err,userInstance)=>{
        console.log(userInstance);
    })
}