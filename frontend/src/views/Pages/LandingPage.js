import React from "react";

// reactstrap components
import {
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import AccueilNavbar from "../../components/Navbars/AccueilNavbar";
import LandingPageHeader from "../../components/Headers/LandingPageHeader.js";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import Javascript from "../../components/Modals/modalFormRent";

function LandingPage() {
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <AccueilNavbar />
      <div className="wrapper">

        <LandingPageHeader />
        <div className="section">
          <Container>
          <div className="button-container">
            <Javascript/>
            {/* Button to propose a room => pop a form modal*/ }
          </div>
            <Row>
            <Col className="ml-auto mr-auto" md="6">

            </Col>

          </Row>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default LandingPage;
