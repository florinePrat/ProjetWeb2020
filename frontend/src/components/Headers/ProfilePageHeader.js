import React from "react";
import axios from 'axios';
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
      imageUrl:'',
    };
    console.log("test",localStorage);
    this.logout.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  logout = event => {
    console.log("logout called");
    auth.logout();
    window.location= '/login-page';
  };

  onFileChange(e) {
    this.setState({ imageUrl: e.target.files[0] })
  }

  onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imageUrl", this.state.imageUrl);
    axios.put("http://localhost:3000/api/auth/addPicture", formData, {
    }).then(res => {
      console.log(res)
    })
  }



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
            <img
                id="photoInitiale"
                alt="..."
                src={require("assets/img/user.png")}
            />

          </div>

          <form onSubmit={this.onSubmit}>
              <input type="file" name="mon avatar" onChange={this.onFileChange} />
              <button className="btn btn-primary" type="submit">Upload</button>
          </form>

          <h3 className="title">{this.state.firstName}</h3>
          <div className="content">
            <div className="social-description">
              <h2>3</h2>
              <p>Reservations</p>
            </div>
            <div className="social-description">
              <h2>2</h2>
              <p>Commentaires</p>
            </div>

            <div className="social-description">
              <h2>5</h2>
              <p>Etoiles</p>
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
