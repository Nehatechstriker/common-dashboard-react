import React, { useState, useEffect } from "react";

import FacebookLogin from "react-facebook-login";
import * as SocialServices from "../../services/authServices";
import showNotification from "../../services/notificationService";
import * as storage from "../../services/session";
export default function SocialFacebookLogin() {
 
  const responseFacebook = (response,props) => {
    let data = {
      email: response.email,
      phone: "8194902374",
      social_id: response.id,
      auth_type: "FACEBOOK",
      role: "USER",
    };
    SocialServices.Social_Login(data).then((resp) => {
      try {
        if (resp.data.status == true) {
          storage.setSession(resp.data.data.access_token);
          storage.setSessionData(JSON.stringify(resp.data.data.meta));
          showNotification("success", "Login Successfully");
          window.location.href = "/admin/dashboard";
        } else {
          showNotification("danger", resp.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <FacebookLogin
      appId=""
      autoLoad={true}
      icon="fa-facebook"
      fields="name,email,picture"
      callback={responseFacebook}
      size="small"
      buttonStyle={{fontSize:"12px",borderRadius: "3px",
      marginBottom: "15px"}}
    />
  );
}
