import React, {useCallback, useEffect} from "react";
// reactstrap components
import {Container, UncontrolledTooltip} from "reactstrap";
import {Nav} from "react-bootstrap";
import auth from "../../utils/auth";
import imageUpload from "../../utils/image-upload";
import user from "../../utils/users";

// core components
let pageHeader = React.createRef();

function ProfilePageHeader() {
  const [firstName] = React.useState(localStorage.getItem("firstName"));
  const [imageUrl, setImageUrl] = React.useState("");
  const [userId] = React.useState(localStorage.getItem("userId"));


  useEffect(() => {
    user.getUser(userId)
      .then(res =>{
      const user = res.data;
      console.log("my user ; ",user);
      setImageUrl(user.imageUrl);
      console.log('my user image :', imageUrl);
    }, function (data) {
      console.log('je suis dans data erreur', data);
    });
  },[]);


  const logout = event => {
    console.log("logout called");
    auth.logout();
    window.location= '/';
  };

  const upload = () => {
    document.getElementById("selectImage").click();
  };

  const handleAvatarChange = (e) => {
    console.log("image", e.target.files[0]);
   imageUpload.upload(e.target.files[0]).then(res => {
      setImageUrl(res.data.imageUrl);
      console.log(imageUrl);
      user.changeAvatar(res.data.imageUrl, userId).then(res =>{
        console.log(imageUrl);
      }, error => {
        console.log(error)
      })
    }, error => {
      console.log(error)
    })
  };


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
            <input type="file" name="avatar" id="selectImage" hidden={true} onChange={handleAvatarChange}/>
            <UncontrolledTooltip
                delay={0}
                placement="bottom"
                target="photoInitiale"
            >
              Clic ici pour changer ta photo
            </UncontrolledTooltip>
              <img
                  id="photoInitiale"
                  onClick={upload}
                  alt="..."
                  src={imageUrl}
              />
          </div>


          <h3 className="title">{firstName}</h3>
          <div className="content">

            <div className="social-description">



            </div>
            <div className="social-description">



            </div>
            <div className="social-description">


            </div>

            <div className="social-description">
              <Nav.Link onClick={logout} >Logout</Nav.Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default ProfilePageHeader;
