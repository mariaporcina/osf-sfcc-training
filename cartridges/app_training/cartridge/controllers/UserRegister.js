'use strict';

var server = require('server');

server.get('Show', function(req, res, next){
    var URLUtils = require('dw/web/URLUtils');
    var BasketMgr = require('dw/order/BasketMgr');

    var currentBasket = BasketMgr.getCurrentBasket();

    // var registerForm = server.forms.getForm('userRegister');
    // registerForm.clear();

    res.render('register/userRegister', {
        // registerForm: registerForm,
        // actionUrl: URLUtils.url('UserRegister-Registration').toString()
    });
    return next();
});

// server.post('Registration', function(req, res, next){
//     var registerForm = server.forms.getForm('userRegister');

//     var firstName = registerForm.profile.firstname.htmlValue

//     var userData = {
//         firstName: firstName
//     }

//     res.render('register/registration', {
//         registerForm: registerForm,
//         userData: userData
//     });

//     return next();
// });

module.exports = server.exports();