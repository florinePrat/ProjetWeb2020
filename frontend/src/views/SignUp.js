import React from "react";
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
  Row
} from "reactstrap";

// core components

import {toast} from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      captcha: '',
    };
  }

  handleInputChange = (event) => {
    const {value, name} = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.password.length < 8) {
      toast.error("Le mot de passe doit possèder au moins 8 caractères.");
      return;
    }
    if (this.state.password !== this.state.password2) {
      toast.error("Les deux mots de passe ne sont pas identiques.");
      return;
    }
    if (!this.state.captcha) {
      toast.error("Vérifiez que vous êtes Humain.");
      return;
    }


  };


  onCaptchaChange(value) {
    this.setState({captcha: value});
  }


  render() {
    return (
        <>
          <div
              className="section section-signup"
              style={{
                backgroundImage: "url(" + require("assets/img/bg11.jpg") + ")",
                backgroundSize: "cover",
                backgroundPosition: "top center",
                minHeight: "700px"
              }}
          >
            <Container>
              <Row>
                <Card className="card-signup" data-background-color="blue">
                  <Form role="form" onSubmit={this.onSubmit}>
                    <CardHeader className="text-center">
                      <CardTitle className="title-up" tag="h3">
                        Sign Up
                      </CardTitle>
                      <div className="social-line">
                        <Button
                            className="btn-neutral btn-icon btn-round"
                            color="facebook"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                        >
                          <i className="fab fa-facebook-square"/>
                        </Button>
                        <Button
                            className="btn-neutral btn-icon btn-round"
                            color="google"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                        >
                          <i className="fab fa-google-plus"/>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <InputGroup
                          className="no-border input-lg"
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons users_circle-08"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            placeholder="First Name..."
                            type="name"
                            name="fisrtName"
                            value={this.state.firstName}
                            onChange={this.handleInputChange}
                        />
                      </InputGroup>

                      <InputGroup
                          className= "no-border input-lg"
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons ui-1_email-85"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            placeholder="Email..."
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            required
                        />
                      </InputGroup>

                      <InputGroup
                          className= "no-border input-lg"
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons ui-1_lock-circle-open"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            placeholder="Password..."
                            type="password"
                            name="password"
                            autoComplete="off"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            required
                        />
                      </InputGroup>

                      <InputGroup
                          className= "no-border input-lg"
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons ui-1_lock-circle-open"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            placeholder="Confirm password..."
                            type="password"
                            name="password2"
                            autoComplete="off"
                            value={this.state.password2}
                            onChange={this.handleInputChange}
                            required
                        />
                      </InputGroup>

                      <div className="text-center mb-3 mt-4">
                        <ReCAPTCHA
                            sitekey="6LfcE8IUAAAAAIMSa9vEYhqVngqTXbtegnYhGkkH"
                            onChange={($event) => this.onCaptchaChange($event)}
                        />
                      </div>

                    </CardBody>
                    <CardFooter className="text-center">
                      <Button
                          className="btn-neutral btn-round"
                          color="info"
                          size="lg"
                          type="submit"
                          onClick={this.onSubmit}
                      >
                        Get Started
                      </Button>
                      <Link to='/login-page'>
                        <small className="text-primary">J'ai déjà un compte</small>
                      </Link>
                    </CardFooter>
                  </Form>
                </Card>
              </Row>
            </Container>
          </div>
        </>
    );
  }
}
export default Register;
