import React from "react";

// reactstrap components
// core components
import AccueilNavbar from "../../components/Navbars/AccueilNavbar";
import LandingPageHeader from "../../components/Headers/LandingPageHeader.js";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import auth from "../../utils/auth";
import axios from "axios";
import {tokenHeaders} from "../../utils/headers";
import RoomCard from "./usersPage/roomCard";
import {Col, Container, Row} from "react-bootstrap";

const burl = "http://localhost:3000/api/room";

class LandingPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            isAuth: auth.isAuth(),
            rooms: []
        };
    }

    componentDidMount() {

        axios.get(burl + '/', {
            headers: tokenHeaders
        })
            .then(res => {
                const rooms = res.data;
                console.log('my data', rooms);
                this.setState({rooms});
            }, function (data) {
                console.log(data);
            })
    }

    render() {
        return (
            <>
                <div className="wrapper">
                    <LandingPageHeader/>
                    <div className="wrapper">
                        <br/>
                        <Container>
                            <Row xs="3">
                                <Col>
                                    {this.state.rooms.map(room =>
                                        <RoomCard
                                            _id={room._id}
                                            title={room.title}
                                            price={room.price}
                                            city={room.city}
                                            address={room.address}
                                            postalCode={room.postalCode}
                                            imageUrl={room.imageUrl}
                                            category={room.category}
                                            state={room.state}
                                            description={room.description}
                                        />
                                    )}
                                </Col>
                            </Row>
                        </Container>
                        <DefaultFooter/>
                    </div>
                </div>
            </>
        );
    }
}

export default LandingPage;