"use strict";

var server = require("server");
var csrfProtection = require("*/cartridge/scripts/middleware/csrf");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");

/*================================================================*/
/*======== Practical exercise: Analyze and run an example ========*/
/*================================================================*/

server.get("Show", consentTracking.consent, server.middleware.https, csrfProtection.generateToken, function(
    req,
    res,
    next
) {
    var URLUtils = require("dw/web/URLUtils");
    var Resource = require("dw/web/Resource");

    var profileForm = server.forms.getForm("training");
    profileForm.clear();

    res.render("trainingform", {
        title: Resource.msg("training.form.title.submit", "forms", null),
        profileForm: profileForm,
        actionUrl: URLUtils.url("TrainingForms-SubmitRegistration").toString()
    });

    next();
});

server.post(
    "SubmitRegistration",
    server.middleware.https,
    consentTracking.consent,
    csrfProtection.generateToken,
    function(req, res, next) {
        var Resource = require("dw/web/Resource");
        var URLUtils = require("dw/web/URLUtils");
        var profileForm = server.forms.getForm("training");
        res.render("trainingform", {
            title: Resource.msg("training.form.title.edit", "forms", null),
            profileForm: profileForm,
            actionUrl: URLUtils.url("TrainingForms-SubmitRegistration").toString()
        });

        next();
    }
);

/*================================================================*/
/*======== Practical exercise: Implement your own version ========*/
/*================================================================*/

server.get("MyFirstForm", function(req, res, next) {
    var URLUtils = require("dw/web/URLUtils");

    //These imports are needed for you to uset eh CustomObjectMgr and Transaction classes
    // var CustomObjectMgr = require("dw/object/CustomObjectMgr");
    // var Transaction = require("dw/system/Transaction");

    // var id = 'mycustomcodeobject';
    // var object = CustomObjectMgr.getCustomObject('NewsletterSubscription', id);

    // if(!object){
    //     Transaction.wrap(function() {
    //         object = CustomObjectMgr.createCustomObject('NewsletterSubscription', id);
    //     });
    // }

    var profileForm = server.forms.getForm("trainingForms");
    profileForm.clear();

    res.render('training/trainingforms', {
        profileForm: profileForm,
        actionUrl: URLUtils.url("TrainingForms-PrintUser").toString()
    });

    return next();
});

server.post('PrintUser', function(req, res, next) {
    var profileForm = server.forms.getForm("trainingForms");
    // var result = getDetailsObject(profileForm);

    res.render('training/printusersinfo', {
        profileForm: profileForm,
    });

    return next();
});

module.exports = server.exports();
