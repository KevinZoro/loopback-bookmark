'use strict';
const config = require('../../server/config.json');
const path = require('path');

module.exports = function (User) {

	// //send verification email after registration
	// User.afterRemote('create', (context, user, next)=>{
	//   console.log('> user.afterRemote triggered');

	//   let options = {
	//     type: 'email',
	//     to: user.email,
	//     from: 'noreply@loopback.com',
	//     subject: 'Thanks for registering.',
	//     template: path.resolve(__dirname, '../../server/views/verify.ejs'),
	//     redirect: '/verified',
	//     user: user
	//   };

	//   user.verify(options, (err, response)=>{
	//     if (err) {
	//       User.deleteById(user.id);
	//       return next(err);
	//     }

	//     console.log('> verification email sent:', response);

	//     context.res.render('response', {
	//       title: 'Signed up successfully',
	//       content: 'Please check your email and click on the verification link ' +
	//           'before logging in.',
	//       redirectTo: '/',
	//       redirectToLinkText: 'Log in'
	//     });
	//   });
	// });
}