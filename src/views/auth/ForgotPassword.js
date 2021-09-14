import React,{useEffect,useState} from "react";
import {Link} from "react-router-dom"
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
} from "reactstrap";

import * as authServices from "../../services/authServices";

function ForgotPage() {
  const [email, setEmail] = useState({email: "",});
  const [errors, setError] = useState({
    email: "",
  });
  const onChange = (e) =>{
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      default:
        break;
    }
    setError(errors);
  }



  return (
    <>
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/bg11.jpg").default + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-signup" data-background-color="blue">
                <Form action="" className="form" method="">
                  <CardHeader className="text-center">
                  <CardTitle className="title-up" tag="h3">
                    Forgot Password
                  </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (email ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_email-85"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="test@gmail.com"
                        type="email"
                        onChange = {onChange}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                  <Button
                    className="btn-neutral btn-round"
                    color="info"
                    href=""
                    onClick={(e) => e.preventDefault()}
                    size="lg"
                  > Send Link
                  </Button>
                    <div className="">
                      <h6> Remember Password</h6>
                      <Link to="/">Sign In</Link>
                    </div>
                    <div className="">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Need Help?
                        </a>
                      </h6>
                    </div>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ForgotPage;
