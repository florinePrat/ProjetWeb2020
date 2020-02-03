import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// styles for this kit
import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss";
import "./assets/demo/demo.css";
import "./assets/demo/nucleo-icons-page-styles.css";
// pages for this kit
import LoginPage from "views/Pages/LoginPage.js";
import LandingPage from "views/Pages/LandingPage.js";
import ProfilePage from "views/Pages/ProfilePage.js";
import { PrivateRoute } from './components/PrivateRoute.js';
import TestS3 from './components/testS3'


// class App call all components and verify if login for some pages with PrivateRoute
class App extends Component{
    render(){
        return (
            <Router>
                <Route exact path="/" component={LandingPage}/>
                    <Route exact path="/landing-page" component={LandingPage}/>
                    <Route exact path ="/login-page" component={LoginPage}/>
                <div className="App-content">
                    <Switch>
                        <PrivateRoute path='/profile-page' component={ProfilePage}/>
                        <PrivateRoute path='/test-s3' component={TestS3}/>
                    </Switch>
                </div>

            </Router>
        )
    }
}


export default App;
