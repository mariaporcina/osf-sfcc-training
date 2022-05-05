'use strict';

var server = require('server');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

server.get('Start', consentTracking.consent, server.middleware.https, csrfProtection.generateToken, function(req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var Resource = require('dw/web/Resource');

    var profileForm = server.forms.getForm('newsletter');
    profileForm.clear();

    res.render('newsletter/newsletterForm', {
        profileForm: profileForm,
        actionUrl: URLUtils.url('NewsletterSubscription-ModalShow').toString(),
    });

    return next();
});

server.get('ModalShow', function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');

    res.render('newsletter/confirmModal', {actionUrl: URLUtils.url('NewsletterSubscription-SubmitRegistration').toString()})

    return next();
});

server.post('SubmitRegistration', server.middleware.https, consentTracking.consent, csrfProtection.generateToken,
function (req, res, next) {

    var URLUtils = require('dw/web/URLUtils');
    var Resource = require('dw/web/Resource');
    var CustomerMgr = require('dw/customer/CustomerMgr');
    var Transaction = require('dw/system/Transaction');
    var CouponMgr = require('dw/campaign/CouponMgr');
    var profileForm = server.forms.getForm('newsletter');
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var Site = require('dw/system/Site');
    var Template = require('dw/util/Template');
    var Mail = require('dw/net/Mail');
    var HashMap = require('dw/util/HashMap');
    var MimeEncodedText = require('dw/value/MimeEncodedText');
    var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');
    var ProductFactory = require('*/cartridge/scripts/factories/product');
    // var alreadySubmitted = false;

    if(profileForm.valid){
        Transaction.wrap(function () {
            var object = CustomObjectMgr.getCustomObject('NewsletterSubscription', profileForm.customer.email.value);
            var newsletterCoupon = CouponMgr.getCoupon('newsletterCoupon');
            var couponCode = newsletterCoupon.getNextCouponCode();
            var alreadySubmitted = 0;

            if(!object){

                object = CustomObjectMgr.createCustomObject('NewsletterSubscription', profileForm.customer.email.value);
                var newCustomerProfile = object.getCustom();
                newCustomerProfile.email = profileForm.customer.email.value;
                newCustomerProfile.firstName = profileForm.customer.firstname.value;
                newCustomerProfile.lastName = profileForm.customer.lastname.value;
                newCustomerProfile.couponCode = couponCode;

                if (newCustomerProfile.couponCode === null) {
                    var template = new Template('newsletter/NoCouponCodeMail');
                }
                else{
                    var template = new Template('newsletter/NewsletterMail');
                }

                var SubscriptionMail = new Mail();
                var context = new HashMap();
                var subject = Resource.msg('message.email.subject', 'newsletter', null);
                context.put('firstName', newCustomerProfile.firstName);
                context.put('lastName', newCustomerProfile.lastName);
                context.put('couponCode', newCustomerProfile.couponCode);

                var content = new MimeEncodedText('');
                content = template.render(context).text;

                SubscriptionMail.addTo('yusuf.hayirli@osf.digital');
                SubscriptionMail.setSubject(subject);
                SubscriptionMail.setFrom(Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com');
                SubscriptionMail.setContent(content, 'text/html', 'UTF-8');
                SubscriptionMail.send();

                res.render('newsletter/thanksforsub', {
                    profileForm: profileForm,
                    alreadySubmitted: alreadySubmitted
                });

            }else{
                //If already submitted mail used
                alreadySubmitted=1;
                res.render('newsletter/thanksforsub', {
                    profileForm: profileForm,
                    alreadySubmitted: alreadySubmitted
                });
            }
        })
    }else{
        //If the form is not valid
        alreadySubmitted=2;
        res.render('newsletter/thanksforsub',{
            alreadySubmitted: alreadySubmitted
        })
    }
    return next();
})

module.exports = server.exports();
