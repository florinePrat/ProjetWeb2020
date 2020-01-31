import React from "react";
import {Container} from "reactstrap";
import auth from "../../utils/auth";
import ExamplesNavbar from "../Navbars/ExamplesNavbar";
import Javascript from "../Modals/modalFormRent";
import AccueilNavbar from "../Navbars/AccueilNavbar";
import SearchComponent from "../search";
// reactstrap components

// core components
class LandingPageHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuth: auth.isAuth(),
        };
    }

    myCallback = (search) => {
        this.props.update(search);
    };


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

                        <SearchComponent callbackFromParent={this.myCallback}/>

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
