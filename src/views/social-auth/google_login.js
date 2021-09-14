import { GoogleLogin } from "react-google-login";
import * as SocialServices from "../../services/authServices";
import showNotification from "../../services/notificationService";
import * as storage from "../../services/session";
import "./style.css";
export default function socialGoogleLogin() {
  const responseGoogle = (response) => {
    let data = {
      email: response.Os.zt,
      phone: "8194902374",
      social_id: response.googleId,
      auth_type: "GOOGLE",
      role: "USER",
    };
    SocialServices.Social_Login(data).then((resp) => {
      console.log(resp,"herere");
      try {
        if (resp.data.status == true) {
          storage.setSession(resp.data.data.access_token);
          storage.setSessionData(JSON.stringify(resp.data.data.meta));
          showNotification("success", resp.data.message);
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
    <GoogleLogin
      clientId=""
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
    ></GoogleLogin>
  );
}
