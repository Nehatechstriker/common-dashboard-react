import React, { useEffect, useState } from "react";
import * as getProfileServices from "../services/authServices";
import * as session from "../services/session";
import showNotification from "../services/notificationService";
import PhoneCode from "react-phone-code";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

export default function Profile(props) {
  const [state, setState] = useState("");
  const [photo, setPhoto] = useState();
  const [file, setFile] = useState();
  const [id, setID] = useState();
  const [phoneCode, setPhoneCode] = useState("");
  const [counting, setCounting] = useState("");
  useEffect(() => {
    ProfileInfo();
  }, []);

  const ProfileInfo = () => {
    getProfileServices.GetProfile().then((resp) => {
      console.log(resp.data, "herer data");
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
        break;
      case "phone_code":
        setPhoneCode((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        break;
      case "address":
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        break;
      case "city":
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        break;
      case "country":
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        break;
      case "pin":
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        break;

      case "intro":
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

  const countWord = (e) => {
    var word = 2000;
    let wordLength = e.target.value.length;
    console.log(wordLength, "here keyup");
    if (wordLength <= word) {
      setCounting(word - wordLength);
    }
  };

  const onUpdate = (e) => {
    e.preventDefault();
    
    let data = {
      name: state.name,
      email: state.email,
      phone: state.phone,
      intro: state.intro,
      phone_code: phoneCode,
      location:{
      address:state.address,
      city:state.city,
      country: state.country,
      pin: state.pin,
      },
      profile_image:
        "https://www.goodmorninghdloveimages.com/wp-content/uploads/2020/04/Always-be-Happy-Whatsapp-Dp-Cute-Profile-Images.png",
    };
    getProfileServices.updateProfile(data).then((resp) => {
      try {
        console.log(resp.data, "hrere");
        if (resp.data.status_code == 200) {
          showNotification("success", resp.data.message);
          props.history.push("/admin/user-profile");
        } else {
          showNotification("error", resp.data.message[0].error);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <Form onSubmit={onUpdate}>
                <CardBody>
                  <Row>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Name</label>
                        <Input
                          name="name"
                          placeholder="Name"
                          value={state.name}
                          type="text"
                          onChange={onChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input
                          name="email"
                          onChange={onChange}
                          value={state.email}
                          type="email"
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Country Code</label>
                        <PhoneCode
                          onSelect={(code) => setPhoneCode(code)}
                          defaultValue="select county"
                          id="phone_code"
                          name="phone_code"
                          className="phone_code"
                          optionClassName="some option class name"
                          onChange={onChange}
                          value={phoneCode}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Phone Number</label>
                        <Input
                          name="phone"
                          placeholder="Phone"
                          type="text"
                          minLength="9"
                          maxLength="12"
                          onChange={onChange}
                          value={state.phone}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          name="address"
                          placeholder="Address"
                          value={state.location ? state.location.address : ""}
                          type="text"
                          onChange={onChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label >City</label>
                        <Input
                          name="city"
                          placeholder="City"
                          onChange={onChange}
                          value={state.location?state.location.city:""}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          name="country"
                          placeholder="Country"
                          value={state.location ? state.location.country : ""}
                          type="text"
                          onChange={onChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Pin Code</label>
                        <Input
                          name="pin"
                          placeholder="Pin Code"
                          onChange={onChange}
                          value={state.location ? state.location.pin:""}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="8">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          cols="80"
                          name="intro"
                          value={state.intro}
                          placeholder="Here can be your description"
                          rows="4"
                          onKeyUp={countWord}
                          onChange={onChange}
                          type="textarea"
                          id="word_count"
                        />
                        <span
                          id="word_left"
                          style={{
                            float: "right",
                            color: "white",
                          }}
                        >
                          {counting}
                        </span>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
                    Save
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    {/* <img
                      alt="..."
                      className="avatar"
                      src="https://www.goodmorninghdloveimages.com/wp-content/uploads/2020/04/Always-be-Happy-Whatsapp-Dp-Cute-Profile-Images.png"
                    /> */}
                    <h5 className="title">{state.name}</h5>
                  </a>
                  <p className="description">Web Developer</p>
                </div>
                <div className="card-description">{state.intro}</div>
              </CardBody>
              <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
