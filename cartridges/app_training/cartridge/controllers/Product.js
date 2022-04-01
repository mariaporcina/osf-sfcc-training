var server = require('server');
server.extend(module.superModule);

//Add _ before req if the variable is not being used. This is necessary so Lint won't fail
server.get('ModalShow', function (_req, res, next) {
    res.render('product/components/myModal')

    return next();
});

module.exports = server.exports();