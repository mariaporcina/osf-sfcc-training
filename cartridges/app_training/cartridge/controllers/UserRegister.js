'use strict';

var server = require('server');

server.get('Show', function(req, res, next){
    var URLUtils = require('dw/web/URLUtils');

    var registerForm = server.forms.getForm('userRegister');
    registerForm.clear();

    res.render('register/userRegister', {
        registerForm: registerForm,
        actionUrl: URLUtils.url('UserRegister-Registration').toString()
    });
    return next();
});

server.post('Registration', function(req, res, next){
    var registerForm = server.forms.getForm('userRegister');

    var firstName = registerForm.userRegister.firstName.htmlValue

    var userData = {
        firstName: firstName
    }

    res.render('register/registration', {
        registerForm: registerForm
    });

    return next();
});

module.exports = server.exports();