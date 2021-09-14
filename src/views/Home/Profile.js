import React, { useEffect, useState } from "react";
import * as getProfileServices from "../../services/authServices";
import Loading from "react-fullscreen-loading";
import base from "../../services/base";
import "./dashboard.css";
import * as session from "../../services/session";
import defaultImage from "../../assets/img/avatar.jpg";
import { confirmAlert } from "react-confirm-alert";
import showNotification from "../../services/notificationService";
export default function Profile(props) {
  const [state, setState] = useState("");
  const [photo, setPhoto] = useState();
  const [file, setFile] = useState();
  const [id, setID] = useState();
  useEffect(() => {
    ProfileInfo();
  }, []);

  const ProfileInfo = () => {
    getProfileServices.GetProfile().then((resp) => {
      try {
        setID(resp.data.data._id);
        setState(resp.data.data);
      } catch (error) {
        console.log(error, "error");
      }
    });
  };

  const onImageChange = (event) => {
    if (event.target.files) {
      setPhoto(event.target.files[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        setFile(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        break;
      case "email":
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));

        break;
      case "phone":
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));

      default:
        break;
    }
  };


  const confirmDelete = (e) => {
    getProfileServices.deleteProfile(id).then((resp) => {
      try {
        if (resp) {
          session.clearSession();
          session.clearSessionData();
          props.history.push("/");
        } else {
          console.log("herer");
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  const logout = (e)=>{
    session.clearSession();
    session.clearSessionData();
    props.history.push("/");
  }

  const onUpdate = (e) => {
    e.preventDefault();
    let data = {
      name: state.name,
      email: state.email,
      phone: state.phone,
      profile_image:
        "https://www.goodmorninghdloveimages.com/wp-content/uploads/2020/04/Always-be-Happy-Whatsapp-Dp-Cute-Profile-Images.png",
    };
    getProfileServices.updateProfile(data).then((resp) => {
      try {
        if (resp.data.status_code == 200) {
          showNotification("success", resp.data.message);
          props.history.push("/profile");
        } else {
          console.log("herer");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <>
      <h1>Profile</h1>
      <button class="logout-btn" style={{
         backgroundColor:"red",color:"white",float:"right"
        }} onClick={() => {
            logout();
          }}>
        Logout
      </button>
      <form onSubmit={onUpdate} id="update-form">
        <div class="body-data">
          <div className="avatar-wrapper">
            <div className="innerdiv">
              <img
                className="profile-pic"
                src={file ? file : "" + defaultImage}
              />
            </div>
            <label className="upload-button" htmlFor="uploadUserImg">
              <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
            </label>
            <input
              className="file-upload"
              name="profile_image"
              type="file"
              accept="image/*"
              id="uploadUserImg"
              onChange={onImageChange}
            />
          </div>
          Name: <br />
          <input
            name="name"
            value={state ? state.name : ""}
            placeholder="Enter your name"
            onChange={onChange}
          />
          <br />
          <br />
          Email: <br />
          <input
            name="email"
            value={state ? state.email : ""}
            placeholder="Enter your Email Id"
            onChange={onChange}
          readOnly/>
          <br />
          <br />
          Mobile Number: <br />
          <input
            name="phone"
            value={state ? state.phone : ""}
            placeholder="Enter your mobile number"
            onChange={onChange}
            maxLength="10"
          />
          <br />
          <br />
          <button type="submit" style={{
         backgroundColor:"green",color:"black"
        }}>Submit</button>
          <br />
          <br />
        </div>
      </form>
      <div class="delete-data">
        <button
          onClick={() => {
            confirmDelete(id);
          }}
        >
          Deactivate
        </button>
      </div>
    </>
  );
}