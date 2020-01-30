import React from "react";
import {Container} from "reactstrap";
import auth from "../../utils/auth";
import ExamplesNavbar from "../Navbars/ExamplesNavbar";
import Javascript from "../Modals/modalFormRent";
import {FormGroup, Button} from "reactstrap";
import CustomInput from "reactstrap/es/CustomInput";
import AccueilNavbar from "../Navbars/AccueilNavbar";
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

                {this.state.isAuth ? <ExamplesNavbar/> : <AccueilNavbar/>}

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

                        <form>
                            <div className="form-row" >
                                <div className="form-group col-md-4">
                                    <FormGroup controlId="localisation">
                                        <CustomInput
                                            type="select"
                                            id="city"
                                            name="customSelect"
                                            value={this.state.city}
                                            onChange={this.handleChange}
                                        >
                                            <option value="">Où ?</option>
                                            <option>Montpellier</option>
                                            <option>Alès</option>
                                        </CustomInput>
                                    </FormGroup>
                                </div>

                                <div className="form-group col-md-4">
                                <FormGroup controlId="category">
                                    <CustomInput
                                        type="select"
                                        id="category"
                                        name="customSelect"
                                        value={this.state.category}
                                        onChange={this.handleChange}
                                    >
                                        <option value="">Type de salle</option>
                                        <option>Salle de fêtes (mariages, soirée, anniverssaire..)</option>
                                        <option>Salle de réunions pro</option>
                                        <option>Salle de coworking</option>
                                        <option>Salle de restaurant</option>
                                        <option>Garage</option>
                                        <option>Hangar</option>
                                    </CustomInput>

                                </FormGroup>
                                </div>
                                <div className="form-group col-md-1">
                                    <FormGroup>
                                        <Button
                                            className='btn-round'
                                            color='info'
                                        >Rechercher
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
