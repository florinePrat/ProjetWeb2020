import React from "react";

// reactstrap components
import {
    Button,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col, CardHeader, Nav, NavItem, NavLink, CardBody, TabContent, TabPane, Card
} from "reactstrap";
import SearchField from "react-search-field";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
let pageHeader= React.createRef();

function LandingPage() {
    const [firstFocus, setFirstFocus] = React.useState(false);
    const [lastFocus, setLastFocus] = React.useState(false);
    React.useEffect(() => {
        document.body.classList.add("landing-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        return function cleanup() {
            document.body.classList.remove("landing-page");
            document.body.classList.remove("sidebar-collapse");
        };
    });
    const [iconPills, setIconPills] = React.useState("1");
    return (
        <>
            <ExamplesNavbar />
            <div className="wrapper">
                <LandingPageHeader />
                <SearchField
                    placeholder="Search..."
                    onChange=""
                    searchText="This is initial search text"
                    classNames="test-class"
                />
                <Container>
                <Card>
                    <CardHeader>

                            <div
                                className="page-header-image"
                                style={{
                                    backgroundImage: "url(" + require("assets/img/bg5.jpg") + ")"
                                }}
                                ref={pageHeader}
                            />
                    </CardHeader>
                    <CardBody>
                        <p>description de la salle :</p>
                    </CardBody>
                </Card>
                    </Container>
                <DefaultFooter />
            </div>
        </>
    );
}

export default LandingPage;
