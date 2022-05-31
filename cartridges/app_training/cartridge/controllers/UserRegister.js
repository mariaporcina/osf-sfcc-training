'use strict';

var server = require('server');

server.get('Show', function(req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var form = server.forms.getForm('userregister');

    res.render('register/registerform', {
        form: form,
        actionUrl: URLUtils.url('UserRegister-Registration').toString()
    });

    return next();
});

server.post('Registration', function(req, res, next) {
    var registerForm = server.forms.getForm('userregister');

    var userData = {
        email: registerForm.userprofile.useremail.htmlValue,
        firstName: registerForm.userprofile.userfirstname.htmlValue,
        lastName: registerForm.userprofile.userlastname.htmlValue,
        phone: registerForm.userprofile.userphone.htmlValue
    }

    res.render('register/registration', {
        userData: userData
    });

    return next();
});

module.exports = server.exports();