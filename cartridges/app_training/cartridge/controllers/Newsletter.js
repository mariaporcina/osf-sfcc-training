'use strict';

var server = require('server');

server.get('Show', function(req, res, next) {
    var form = server.forms.getForm('newsletter');
    form.clear();

    res.render('newsletter/newsletterForm', { form: form });
    return next();
});

module.exports = server.exports();