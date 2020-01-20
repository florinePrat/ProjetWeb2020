import React from "react";
import axios from 'axios';
import {tokenHeaders} from '../../utils/headers';
// reactstrap components
import { Container } from "reactstrap";
const burl = "http://localhost:3000/api/user";

// core components
let pageHeader= React.createRef();
class ProfilePageHeader extends React.Component{



  constructor(props) {
    super(props);
    this.state = {
      firstName: ""
    }
  }


  componentDidMount() {

    axios.get(burl + '/api/user/getUserTasks',{
      headers: tokenHeaders
    } )
        .then(res => {
          const name = res.data.firstName;
          console.log(name);
          this.setState({ name });

        }, function(data){
          console.log(data);
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
          </div>
        </Container>
      </div>
    </>
  );
}
}

export default ProfilePageHeader;
