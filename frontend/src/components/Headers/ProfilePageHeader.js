import React from "react";
import axios from 'axios';
// reactstrap components
import {Container, UncontrolledTooltip} from "reactstrap";
import {Nav} from "react-bootstrap";
import auth from "../../utils/auth";

// core components
let pageHeader= React.createRef();
const burl = "http://localhost:3000/images";

class ProfilePageHeader extends React.Component{


  constructor(props) {
    super(props);
    this.state = {
      isAuth : auth.isAuth(),
      firstName:localStorage.getItem("firstName"),
      imageUrl:localStorage.getItem("imageUrl"),
      avatar:" ",
    };
    console.log("test",localStorage);
    this.logout.bind(this);
    this.send = this.send.bind(this);
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
  }


  logout = event => {
    console.log("logout called");
    auth.logout();
    window.location= '/login-page';
  };

  send = event => {
    console.log("image",this.state.avatar);
    const formData = new FormData();
    formData.append("imageUrl", this.state.avatar);
    axios.put("http://localhost:3000/images/addPicture", formData, {
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      console.log(res)
    })
  };

  upload() {
    document.getElementById("selectImage").click()
  };

  handleAvatarChange(e) {
    const avatar = e.target.value;
    this.setState({avatar: avatar});
    console.log("target", e.target.value);
    console.log("image", this.state.avatar.value)
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
            <input type="file" name="avatar" id="selectImage" hidden={true} onChange={this.handleAvatarChange}/>
            <UncontrolledTooltip
                delay={0}
                placement="bottom"
                target="photoInitiale"
            >
              Clic ici pour changer ta photo
            </UncontrolledTooltip>
              <img
                  id="photoInitiale"
                  onClick={this.upload}
                  alt="..."
                  src={(burl + this.state.imageUrl)}
              />
          </div>


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
