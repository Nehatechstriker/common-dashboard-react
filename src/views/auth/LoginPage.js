import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row,
} from "reactstrap";
import * as LoginService from "../../services/authServices";
import showNotification from "../../services/notificationService";
import GoogleLogin from "../social-auth/google_login";
import FacebookLogin from "../social-auth/facebook_login";
import * as storage from "../../services/session";
export default function LoginPage(props) {
  useEffect(() => {
    FacebookLogin();
  }, []);
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [errors, setError] = useState({
    email: "",
    password: "",
  });

  const stateHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));

        break;
      case "password":
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      default:
        break;
    }
    setError(errors);
  };


  const submitHandler = (e) => {
    e.preventDefault();
    LoginService.Login(state).then((resp) => {
      try {
        if (resp.data.status == true) {
          storage.setSession(resp.data.data.access_token);
          storage.setSessionData(JSON.stringify(resp.data.data.meta));
          showNotification("success", "Login Successfully");
          props.history.push("/admin/user-profile");
        } else {
          showNotification("danger", resp.data.message[0].error);
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <>
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/bg11.jpg").default + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        ></div>
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-signup" data-background-color="blue">
                <CardHeader className="text-center">
                  <CardTitle className="title-up" tag="h3">
                    Sign In
                  </CardTitle>
                  <div className="social-line">
                  <div class="col">
          <FacebookLogin></FacebookLogin>
          <GoogleLogin></GoogleLogin>
      </div>
                    
                    
                  </div>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={submitHandler}>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (state ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_email-85"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="email"
                        placeholder="test@gmail.com"
                        type="email"
                        onChange={stateHandler}
                      ></Input>
                      {errors.email.length > 0 && (
                        <span className="error">{errors.email}</span>
                      )}
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (state ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_lock-circle-open"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="password"
                        placeholder="Enter Password"
                        type="password"
                        minLength="8"
                        onChange={stateHandler}
                      ></Input>
                      {errors.password.length > 0 && (
                        <span className="error">{errors.password}</span>
                      )}
                    </InputGroup>
                    <Button
                      type="submit"
                      className="btn-neutral btn-round"
                      color="info"
                      size="lg"
                      style={{ marginLeft: "86px" }}
                    >
                      Sign In
                    </Button>
                  </Form>
                </CardBody>
                <CardFooter className="text-center">
                  <div className="">
                    <h6>Need an account?</h6>
                    <Link to="/register"> Sign Up</Link>
                  </div>
                  <div className="">
                    <h6>
                      <Link to="/forgot-password"> Forgot Password</Link>
                    </h6>
                  </div>
                  <div className="">
                    <h6>
                      <a
                        className="link"
                        href="#pablo"
                        // onClick={(e) => e.preventDefault()}
                      >
                        Need Help?
                      </a>
                    </h6>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
