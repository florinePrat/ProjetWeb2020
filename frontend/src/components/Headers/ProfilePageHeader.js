import React from "react";
// reactstrap components
import { Container } from "reactstrap";
import {Nav} from "react-bootstrap";
import auth from "../../utils/auth";

// core components
let pageHeader= React.createRef();
class ProfilePageHeader extends React.Component{



  constructor(props) {
    super(props);
    this.state = {
      isAuth : auth.isAuth(),
      firstName:localStorage.getItem("firstName"),
    };
    console.log("test",localStorage);
    this.logout.bind(this);
  }


  logout = event => {
    console.log("logout called");
    auth.logout();
    window.location= '/login-page';
  };

  render(){
  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/bg5.jpg") + ")"
          }}
          ref={pageHeader}
        />
        <Container>
          <div className="photo-container">
            <img alt="..." src={require("assets/img/ryan.jpg")}/>
          </div>
          <h3 className="title">{this.state.firstName}</h3>
          <div className="content">
            <div className="social-description">
              <h2>26</h2>
              <p>Comments</p>
            </div>
            <div className="social-description">
              <h2>26</h2>
              <p>Comments</p>
            </div>
            <div className="social-description">
              <h2>48</h2>
              <p>Bookmarks</p>
            </div>
            <div className="social-description">
              <Nav.Link onClick={this.logout} >Logout</Nav.Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
}

export default ProfilePageHeader;
