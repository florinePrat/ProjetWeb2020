import React from "react";

// reactstrap components
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Container,
  Col
} from "reactstrap";
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";

  import API from '../../utils/auth';
import {FormGroup, FormControl}  from "react-bootstrap";

  export class signup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        firstName: "",
        password: "",
        isLoggedIn: false,
        error: false
      };
      this.handleChange.bind(this);
      this.send.bind(this);

      this.sendLog.bind(this);
      this.handleLoginClick = this.handleLoginClick.bind(this);
      this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLoginClick() {
      this.setState({isLoggedIn: true});
      this.setState({error: ""});
    }

    handleLogoutClick() {
      this.setState({isLoggedIn: false});
      this.setState({error: ""});
    }

    send = event => {
      if (this.state.email.length === 0) {
        this.setState({error: "email vide"});
      } else if (this.state.firstName.length === 0) {
        this.setState({error: "prenom vide"});
      } else if (this.state.password.length === 0) {
        this.setState({error: "mot de passe vide"});
      } else {
        API.signup(this.state.email, this.state.firstName, this.state.password).then(res => {
          console.log(res.data.firstName);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('firstName', res.data.firstName);
          localStorage.setItem('imageUrl', res.data.imageUrl);
          console.log("signup",localStorage);
          window.location = "./profile-page"
        }, error => {
          console.log(error.response.data.error);
          this.setState({error:error.response.data.error});
        })
      }
    };

    sendLog = async () => {
      if (this.state.email.length === 0) {
        this.setState({error: "email vide"});
      } else if (this.state.password.length === 0) {
        this.setState({error: "mot de passe vide"});
      } else {
        try {
          const res = await API.login(this.state.email, this.state.password);
          console.log("token" , res.data.token);
          console.log(res.data.firstName);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('firstName', res.data.firstName);
          localStorage.setItem('imageUrl', res.data.imageUrl);
          console.log("res",localStorage);
          window.location = "./profile-page";

        }
        catch(res) {
          console.log('ici :',res);
          if (res.response) {
            console.log('erreur: ',res.response);
            this.setState({error: res.response.data.error});
        }

        }
      }
    };
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    };


    GuestGreeting() {
      return (
          <>
            <ExamplesNavbar/>
            <div className="page-header clear-filter" filter-color="blue">
              <div
                  className="page-header-image"
                  style={{
                    backgroundImage: "url(" + require("assets/img/login.jpg") + ")"
                  }}
              />
              <div className="content">
                <Container>
                  <Col className="ml-auto mr-auto" md="4">
                    <Card className="card-login card-plain">
                      <Form action="" className="form" method="">
                        <CardHeader className="text-center">
                          <div className="logo-container">
                            <img
                                alt="..."
                                src={require("assets/img/eye.png")}
                            />
                          </div>
                        </CardHeader>
                        <CardBody>
                          <h2> Connexion </h2>
                          {this.state.error ?
                            <Alert color="danger">
                              {this.state.error}
                            </Alert> : false
                           }


                            <FormGroup controlId="email">
                              <i className="now-ui-icons ui-1_email-85"/> Email :
                              <FormControl
                                    placeholder= "exemple@email.fr"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    type="email"
                                >
                              </FormControl>
                            </FormGroup>

                          <FormGroup controlId="password">
                            <i className="now-ui-icons ui-1_lock-circle-open"/> Mot de passe :
                            <FormControl
                                placeholder="Password..."
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                required
                            >
                            </FormControl>
                          </FormGroup>
                        </CardBody>
                        <CardFooter className="text-center">
                          <Button
                              block
                              className="btn-round"
                              color="info"
                              onClick={this.sendLog}
                              size="lg"
                          >
                            Get Started
                          </Button>
                          <div className="pull-left">
                            <h6>
                              <a
                                  className="link"
                                  href="#"
                                  onClick={this.handleLoginClick}
                              >
                                Create Account
                              </a>
                            </h6>
                          </div>

                        </CardFooter>
                      </Form>
                    </Card>
                  </Col>
                </Container>
              </div>
              <TransparentFooter/>
            </div>
          </>
      );
    }


    UserGreeting() {
      return (
          <>
            <ExamplesNavbar/>
            <div className="page-header clear-filter" filter-color="blue">
              <div
                  className="page-header-image"
                  style={{
                    backgroundImage: "url(" + require("assets/img/login.jpg") + ")"
                  }}
              />
              <div className="content">
                <Container>
                  <Col className="ml-auto mr-auto" md="4">
                    <Card className="card-login card-plain">
                      <FormGroup action="" className="form" method="">
                        <CardHeader className="text-center">
                          <div className="logo-container">
                            <img
                                alt="..."
                                src={require("assets/img/eye.png")}
                            />
                          </div>
                        </CardHeader>
                        <CardBody>
                          <h2> Inscription </h2>
                          {this.state.error ?
                              <Alert color="danger">
                                {this.state.error}
                              </Alert> : false
                          }

                          <FormGroup controlId="email">
                                <i className="now-ui-icons ui-1_email-85"/> Email :
                            <FormControl
                                placeholder="Email..."
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                required
                            >
                            </FormControl>
                          </FormGroup>

                          <FormGroup controlId="firstName">
                                <i className="now-ui-icons users_circle-08"/> Prénom :
                            <FormControl
                                placeholder="First Name..."
                                type="name"
                                value={this.state.firstName}
                                onChange={this.handleChange}
                            >
                            </FormControl>
                          </FormGroup>

                          <FormGroup controlId="password">
                                <i className="now-ui-icons ui-1_lock-circle-open"/> Mot de passe :
                            <FormControl
                                placeholder="Password..."
                                type="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                required
                            >
                            </FormControl>
                          </FormGroup>
                        </CardBody>
                        <CardFooter className="text-center">
                          <Button
                              block
                              className="btn-round"
                              color="info"
                              onClick={this.send}
                              size="lg"
                          >
                            Get Started
                          </Button>
                          <div className="pull-left">
                            <h6>
                              <a
                                  className="link"
                                  href="#"
                                  onClick={this.handleLogoutClick}
                              >
                                Sign In
                              </a>
                            </h6>
                          </div>

                        </CardFooter>
                      </FormGroup>
                    </Card>
                  </Col>
                </Container>
              </div>
              <TransparentFooter/>
            </div>
          </>
      );
    }

    render() {
      return (

          <div>
            {
              this.state.isLoggedIn
                  ? this.UserGreeting()
                  : this.GuestGreeting()
            }
          </div>
      );
    }

  }
export default signup;
