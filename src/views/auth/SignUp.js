import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./signup.css"
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
  Row,
} from "reactstrap";
import * as RegisterService from "../../services/authServices";
import showNotification from "../../services/notificationService";
import * as storage from "../../services/session";
export default function SignUp(props) {

  const [state, setState] = useState({
    name:"",
    email: "",
    password: "",
   
  });
  const [errors, setError] = useState({
    name:"",
    email: "",
    password: "",
  });


  const stateHandler = (e) => {
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
    //  let passwordReg = new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$");
    // if(state.password){
    //   console.log(state.password,"here password");
    //   console.log(passwordReg.test(state.password).toString(),"herer");
    //   if(passwordReg.test(state.password).toString() === "false"){
    //     return;
    //   }
    // }
    const data = {
      name:state.name,
      email: state.email,
      password: state.password,
      "role": "USER",
      "auth_type": "FORM",
    }
    RegisterService.Register(data).then((resp) => {
      try {
        if(resp.data.status == true){
          showNotification("success", resp.data.message);
          props.history.push("/")
        }else{
          showNotification("danger", resp.data.message[0].error);
        }
        }catch (err) {
        console.log(err);
      }
  });
}
  
  return (
    <>
      <div
        className="section section-signup"
        style={{
          backgroundImage:
            "url(" + require("assets/img/bg11.jpg").default + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          minHeight: "700px",
        }}
      >
        <Container>
          <Row class="row-signup">
            <Card className="card-signup-register" data-background-color="blue">
              <Form onSubmit={submitHandler}>
                <CardHeader className="text-center">
                  <CardTitle className="title-up" tag="h3">
                    Sign Up
                  </CardTitle>
                </CardHeader>
                <CardBody>
                <InputGroup
                    className={
                      "no-border" + (state ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons users_circle-08"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="name"
                      placeholder="Name..."
                      type="text"
                      onChange={stateHandler}
                    ></Input>
                  </InputGroup>
                  <InputGroup
                    className={
                      "no-border" + (state ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons ui-1_email-85"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="email"
                      placeholder="Email..."
                      type="text"
                      onChange={stateHandler}
                    ></Input>
                  </InputGroup>
                  <InputGroup
                    className={
                      "no-border" + (state ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons ui-1_lock-circle-open"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                    name="password"
                      placeholder="Password..."
                      type="password"
                      onChange={stateHandler}
                    ></Input>
                  </InputGroup>
                </CardBody>
                <CardFooter className="text-center">
                  <Button
                    type="submit"
                    className="btn-neutral btn-round"
                    color="info"
                    size="lg"
                  >
                    Get Started
                  </Button>
                  <div className="col text-center">
                    <h6>Already have an Account ?</h6>
                    <Link to="/">Sign In </Link>
                  </div>
                </CardFooter>
              </Form>
            </Card>
          </Row>

        </Container>
      </div>
    </>
  );
}

