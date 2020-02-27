import React from "react";
// reactstrap components
import {Container, UncontrolledTooltip} from "reactstrap";
import {Nav} from "react-bootstrap";
import auth from "../../utils/auth";
import CreatePassword from "../../components/Modals/modalCreatePassword";
import imageUpload from "../../utils/image-upload";
import user from "../../utils/users";

// core components
let pageHeader= React.createRef();

class ProfilePageHeader extends React.Component{


  constructor(props) {
    super(props);
    this.state = {
      isAuth : auth.isAuth(),
      firstName:localStorage.getItem("firstName"),
      imageUrl:"",
      userId:localStorage.getItem("userId"),
    };
    this.logout.bind(this);
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
  }

  componentDidMount() {
    user.getUser(this.state.userId)
      .then(res =>{
      const user = res.data;
      console.log("my user ; ",user);
      this.setState({imageUrl: user.imageUrl});
      console.log('my user image :', this.state.imageUrl);
    }, function (data) {
      console.log('je suis dans data erreur', data);
    });
  }


  logout = event => {
    console.log("logout called");
    auth.logout();
    window.location= '/';
  };

  upload(){
    document.getElementById("selectImage").click();
  };

  handleAvatarChange(e) {
    this.state = ({avatar: e.target.files[0]});
    console.log("image",this.state.avatar);
    imageUpload.upload(this.state.avatar).then(res => {
      this.setState({imageUrl : res.data.imageUrl});
      console.log(this.state.imageUrl);
      user.changeAvatar(this.state.imageUrl, this.state.userId).then(res =>{
        console.log(this.state.imageUrl);
      }, error => {
        console.log(error)
      })
    }, error => {
      console.log(error)
    })
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
            <input type="file" name="avatar" id="selectImage" hidden={true} value={this.state.avatar} onChangeCapture={this.handleAvatarChange}/>
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
                  src={this.state.imageUrl}
              />
          </div>


          <h3 className="title">{this.state.firstName}</h3>
          <div className="content">

            {this.state.statePassword === 'false'
                ? <CreatePassword/>
                : null
            }
            <div className="social-description">



            </div>
            <div className="social-description">



            </div>
            <div className="social-description">


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
