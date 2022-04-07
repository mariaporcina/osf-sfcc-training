'use strict';

const initLoginFunctionality = () => {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '391956239599920',
      xfbml      : true,
      version    : 'v13.0'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  $(document).on("click", "button.login-in-button", function() {
    FB.getLoginStatus(function(response) {
      if(response.status !== 'connected'){
        loginIn();
      } else {
        getUserProfile();
      }
    });

    $(document).on("click", "button.logout-button", function() {
      logout();
    });

  });
}

const getUserProfile = () => {
  FB.api('/me', {fields: 'id,name,email'}, response => {
    var data = {
      id: response.id,
      name: response.name,
      email: response.email
    }

    FB.api('/me/picture?redirect=false&width=300', response => {
      data.imageUrl = response.data.url;
      renderUserProfile(data);
    });
  });
}

const renderUserProfile = data => {
  $('h5.card-title').text(data.name);
  $('h6.card-subtitle').text(data.id);
  $('p.card-text').text(data.email);

  $('img.card-img-top').attr('src', data.imageUrl);
  $('img.card-img-top').attr('alt', data.name);
}

const loginIn = () => {
  FB.login(response => {
    if (response.authResponse) {
      getUserProfile();
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  }, {scope: 'public_profile,email'});
}

const logout = () => {
  FB.logout(() => {
    console.log('You were logged out from Facebook. To login again click on the "Authenticate" button.')
  });
}

module.exports = () => {
  initLoginFunctionality()
}