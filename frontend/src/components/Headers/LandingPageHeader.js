import React from "react";
import {Container} from "reactstrap";
import CreateRoom from "../Modals/modalFormRent";
import SearchComponent from "../search";
import auth from "../../utils/auth";
// reactstrap components

// core components

function LandingPageHeader({update, rooms}) {
    const [isAuth] = React.useState(auth.isAuth());

    const myCallback = (search) => {
        update(search);
    };


        return (
            <>

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

                        <SearchComponent callbackFromParent={myCallback} rooms={rooms}/>

                    </Container>

                    <Container>
                        {isAuth ?
                            null
                            : <div className="button-container">
                                <CreateRoom/>
                                {/* Button to propose a room => pop a form modal*/}
                            </div>}

                    </Container>


                </div>

            </>
        );
}

export default LandingPageHeader;
