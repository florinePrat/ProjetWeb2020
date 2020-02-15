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
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "../../components/Footers/TransparentFooter.js";

import API from '../../utils/auth';
import {FormGroup, FormControl} from "react-bootstrap";
import AccueilNavbar from "../../components/Navbars/AccueilNavbar";

function Signup() {
    const [email, setEmail] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [hasPassword, setHasPassword] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [step, setStep] = React.useState(true);


    React.useEffect(() => {
        document.body.classList.add("login-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        return function cleanup() {
            document.body.classList.remove("login-page");
            document.body.classList.remove("sidebar-collapse");
        };
    });




    function handleLoginClick() {
        setIsLoggedIn (true);
        setError ("");
    }

    function handleLogoutClick() {
        setIsLoggedIn (false);
        setError ("");
    }

    function send  (event) {
        if (email.length === 0) {
            setError("email vide");
        } else if (firstName.length === 0) {
            setError("prenom vide");
        } else if (phoneNumber.length === 0) {
            setError("numero de telephone vide");
        } else {
            API.signup(email, firstName, phoneNumber).then(res => {
                console.log(res.data.firstName);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('firstName', res.data.firstName);
                localStorage.setItem('userId', res.data.userId);
                localStorage.setItem('statePassword', res.data.statePassword);
                console.log("signup", localStorage);
                window.location = "./profile-page"
            }, error => {
                console.log(error.response.data.error);
                this.setState({error: error.response.data.error});
            })
        }
    }

    function sendEmail ( event ) {
        if (email.length === 0) {
            setError("email vide");
        } else {
            API.sendEmail(email).then(res => {
                console.log('res.data : ',res.data);
                setStep(false);
                setHasPassword(res.data);
                console.log("signup", localStorage);
            }, error => {
                console.log(error.response.data.error);
                setError(error.response.data.error);
            })
        }
    }

    async function sendLog() {
        if (email.length === 0) {
            setError("email vide");
        } else if (password.length === 0) {
            setError( "mot de passe vide");
        } else {
            try {
                const res = await API.login(email, password);
                console.log("token", res.data.token);
                console.log(res.data.firstName);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('firstName', res.data.firstName);
                localStorage.setItem('userId', res.data.userId);
                localStorage.setItem('statePassword', res.data.statePassword);
                console.log("res", localStorage);
                window.location = "./profile-page";

            } catch (res) {
                console.log('ici :', res);
                if (res.response) {
                    console.log('erreur: ', res.response);
                    setError( res.response.data.error);
                }

            }
        }
    }



   function GuestGreeting() {
        return (
            <>
                <AccueilNavbar/>
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
                                            {error ?
                                                <Alert color="danger">
                                                    {error}
                                                </Alert> : false
                                            }


                                            <FormGroup controlId="email">
                                                <i className="now-ui-icons ui-1_email-85"/> Email :
                                                <FormControl
                                                    placeholder="exemple@email.fr"
                                                    value={email}
                                                    onChange={event => setEmail(event.target.value)}
                                                    type="email"
                                                >
                                                </FormControl>
                                            </FormGroup>
                                            <div hidden={step}>
                                                <FormGroup controlId="password">
                                                    <i className="now-ui-icons ui-1_lock-circle-open"/> {hasPassword
                                                    ? "Mot de passe :"
                                                    : "Créez votre mot de passe : "
                                                }
                                                    <FormControl
                                                        placeholder="Password..."
                                                        type="password"
                                                        name="password"
                                                        value={password}
                                                        onChange={event => setPassword(event.target.value)}
                                                        required
                                                    >
                                                    </FormControl>
                                                </FormGroup>
                                            </div>
                                        </CardBody>
                                        <CardFooter className="text-center">
                                            {!step
                                                ?
                                                <Button
                                                    block
                                                    className="btn-round"
                                                    color="info"
                                                    onClick={sendLog}
                                                    size="lg"
                                                >
                                                    Get Started
                                                </Button>

                                                :
                                                <Button
                                                    block
                                                    className="btn-round"
                                                    color="info"
                                                    onClick={sendEmail}
                                                    size="lg"
                                                >
                                                    Suivant
                                                </Button>
                                            }
                                            <div className="pull-left">
                                                <h6>
                                                    <Button
                                                        className={"btn-round"}
                                                        onClick={handleLoginClick}
                                                    >
                                                        S'inscrire
                                                    </Button>
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


    function UserGreeting() {
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
                                            {error ?
                                                <Alert color="danger">
                                                    {error}
                                                </Alert> : false
                                            }

                                            <FormGroup controlId="email">
                                                <i className="now-ui-icons ui-1_email-85"/> Email :
                                                <FormControl
                                                    placeholder="Email..."
                                                    type="email"
                                                    value={email}
                                                    onChange={event => setEmail(event.target.value)}
                                                    required
                                                >
                                                </FormControl>
                                            </FormGroup>

                                            <FormGroup controlId="firstName">
                                                <i className="now-ui-icons users_circle-08"/> Prénom :
                                                <FormControl
                                                    placeholder="First Name..."
                                                    type="name"
                                                    value={firstName}
                                                    onChange={event => setFirstName(event.target.value)}
                                                >
                                                </FormControl>
                                            </FormGroup>

                                            <FormGroup controlId="phoneNumber">
                                                <i className="now-ui-icons tech_mobile"/> Numéro de téléphone :
                                                <FormControl
                                                    placeholder="Numéro de téléphone *"
                                                    type="text"
                                                    value={phoneNumber}
                                                    onChange={event => setPhoneNumber(event.target.value)}
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
                                                onClick={send}
                                                size="lg"
                                            >
                                                Get Started
                                            </Button>
                                            <div className="pull-left">
                                                <h6>
                                                    <Button
                                                        className={"btn-round"}
                                                        onClick={handleLogoutClick}
                                                    >
                                                        Se connecter
                                                    </Button>
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

        return (

            <div>
                {
                    isLoggedIn
                        ? UserGreeting()
                        : GuestGreeting()
                }
            </div>
        );
    }


export default Signup;
