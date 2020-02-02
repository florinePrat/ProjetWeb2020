import React from "react";

// reactstrap components
// core components
import LandingPageHeader from "../../components/Headers/LandingPageHeader.js";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import auth from "../../utils/auth";
import axios from "axios";
import {tokenHeaders} from "../../utils/headers";
import RoomCard from "../../components/Cards/roomCardForLanding";
import {Col, Container, Row} from "react-bootstrap";
import room from "../../utils/room";

const burl = "http://localhost:3000/api/room";

class LandingPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            isAuth: auth.isAuth(),
            rooms: []
        };
    }

    myCallback = (search) => {
        this.state = {category: search[0], city: search[1]};

        room.getAllSearchRooms(this.state.category, this.state.city).then(res => {
            const rooms = res.data;
            console.log('je suis bien dans la requette send ! ');
            console.log(this.state.category);
            console.log(this.state.city);
            console.log("room : ", rooms);
            this.setState({rooms});
            localStorage.setItem("roomUrl", rooms[0].imageUrl)
        }, error => {
            console.log(error)
        })
    };


    componentDidMount() {

        axios.get(burl + '/', {
            headers: tokenHeaders
        })
            .then(res => {
                const rooms = res.data;
                console.log('my data', rooms);
                this.setState({rooms});
                localStorage.setItem("roomUrl", rooms[0].imageUrl)
            }, function (data) {
                console.log(data);
            })
    }

    render() {
        return (
            <>
                <div className="wrapper">
                    <LandingPageHeader update={this.myCallback}/>
                    <div className="wrapper">
                        <br/>
                        <Container>
                            <Row>
                                {this.state.rooms.map(room => (
                                    <Col xs={4}>
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
                                            availability={room.availability}
                                            userId={room.userId}
                                        />
                                    </Col>
                                ))}
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
