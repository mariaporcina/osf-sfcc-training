'use strict';

var server = require('server');

server.get('Show', function(req, res, next) {
    var URLUtils = require('dw/web/URLUtils');

    var form = server.forms.getForm('newsletter');
    form.clear();

    res.render('newsletter/newsletterForm', {
        form: form,
        actionUrl: URLUtils.url('Newsletter-Confirmation').toString()
    });
    return next();
});

server.post('Confirmation', function(req, res, next) {
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var Transaction = require('dw/system/Transaction');
    var CouponMgr = require('dw/campaign/CouponMgr');
    var HashMap = require('dw/util/HashMap');
    var Mail = require('dw/net/Mail');
    var Template = require('dw/util/Template');
    var Site = require('dw/system/Site');
    var Resource = require('dw/web/Resource');

    var form = server.forms.getForm('newsletter');

    var email = form.newsletter.email.htmlValue;
    var firstName = form.newsletter.firstname.htmlValue;
    var lastName = form.newsletter.lastname.htmlValue;

    var coupon = CouponMgr.getCoupon('20-off-per-order');
    // var coupon = CouponMgr.getCoupon('test-coupon');

    var newsletterObject = CustomObjectMgr.getCustomObject('NewsletterSubscription', email);

    if(!newsletterObject){
        Transaction.wrap(function() {
            var nextCoupon = coupon.getNextCouponCode();
            var newNewsletterObject = CustomObjectMgr.createCustomObject('NewsletterSubscription', email);

            newNewsletterObject.custom.firstname = firstName;
            newNewsletterObject.custom.lastname = lastName;
            newNewsletterObject.custom.couponcode = nextCoupon;
        });

        var lastSubscriber = CustomObjectMgr.getCustomObject('NewsletterSubscription', email);
        var lastSubscriberData = {
            email: lastSubscriber.custom.email,
            firstname: lastSubscriber.custom.firstname,
            lastname: lastSubscriber.custom.lastname,
            couponcode: lastSubscriber.custom.couponcode,
        }
        var currentSite = Site.getCurrent();
        var fromEmail = currentSite.getCustomPreferenceValue('customerServiceEmail');

        var hashmap = new HashMap();
        hashmap.put('subscriber', lastSubscriberData);

        var template = new Template('newsletter/emailConfirmation.isml');
        var content = template.render(hashmap);

        var mail = new Mail();
        mail.addTo(email);
        mail.setFrom(fromEmail);
        mail.setSubject(Resource.msg('email.confirmation.subject', 'newsletter', null));
        mail.setContent(content);
        mail.send();
    }

    res.render('newsletter/newsletterForm', {
        form: form
    });

    return next();
});

module.exports = server.exports();