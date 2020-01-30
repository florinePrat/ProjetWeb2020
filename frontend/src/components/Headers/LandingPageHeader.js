import React from "react";
import {Container} from "reactstrap";
import auth from "../../utils/auth";
import ExamplesNavbar from "../Navbars/ExamplesNavbar";
import Javascript from "../Modals/modalFormRent";
import {FormGroup, Input} from "reactstrap";
import {Button, FormControl} from "react-bootstrap";
// reactstrap components

// core components
class LandingPageHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuth: auth.isAuth(),
        };
    }

    render() {
        return (
            <>
                {this.state.isAuth ? <ExamplesNavbar/> : null}

                <div className="page-header page-header-small">


                    <div
                        className="page-header-image"
                        style={{
                            backgroundImage: "url(" + require("assets/img/salleacc.jpg") + ")"
                        }}
                    />

                    <Container>

                        <div id="home-page" className="home-bg-wrapper">
                            <div className="form-and-title" id="home-search-wrapper">
                                <h1>Trouvez la salle idéale pour votre <br className="d-block d-md-none"/><span
                                    id="homeTyped">événement</span></h1>
                            </div>
                        </div>

                    </Container>

                    <Container>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <FormGroup controlId="search">
                                        <Input
                                            placeholder="Mots clés ..."
                                            type="text"
                                        >
                                        </Input>
                                    </FormGroup>
                                </div>

                                <div className="form-group col-md-3">
                                <FormGroup controlId="category">
                                    <FormControl
                                        placeholder="Categorie *"
                                        as="select"
                                        value={this.state.category}
                                        onChange={this.handleChange}
                                        type="text"
                                    >
                                        <option>{this.state.category}</option>
                                        <option>Salle de fêtes (mariages, soirée, anniverssaire..)</option>
                                        <option>Salle de réunions pro</option>
                                        <option>Salle de coworking</option>
                                        <option>Salle de restaurant</option>
                                        <option>Garage</option>
                                        <option>Hangar</option>
                                    </FormControl>
                                </FormGroup>
                                </div>
                                <div className="form-group col-md-2">
                                    <FormGroup>
                                        <Button
                                            color='neutral'
                                        >
                                            Rechercher
                                        </Button>
                                    </FormGroup>
                                </div>
                            </div>
                        </form>

                    </Container>

                    <Container>
                        {this.state.isAuth ?
                            null
                            : <div className="button-container">
                                <Javascript/>
                                {/* Button to propose a room => pop a form modal*/}
                            </div>}

                    </Container>


                </div>

            </>
        );
    }
}

export default LandingPageHeader;
