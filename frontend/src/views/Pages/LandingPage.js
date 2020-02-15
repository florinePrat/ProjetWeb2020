import React from "react";

// core components
import LandingPageHeader from "../../components/Headers/LandingPageHeader.js";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import auth from "../../utils/auth";
import RoomCard from "../../components/Cards/roomCardForLanding";
import {Col, Container, Row} from "react-bootstrap";
import room from "../../utils/room";


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
            this.setState({rooms:rooms});
        }, error => {
            console.log(error)
        })
    };

    reload = () => {
        room.getAllRooms()
            .then(res => {
                const rooms = res.data;
                this.setState({rooms:rooms});
            }, function (data) {
                console.log(data);
            })
    };


    componentDidMount() {
        room.getAllRooms()
            .then(res => {
            const rooms = res.data.room;
            this.setState({rooms:rooms});
        }, function (data) {
            console.log(data);
        })
    }

    render() {
        return (
            <>
                <div className="wrapper">
                    <LandingPageHeader
                        update={this.myCallback}
                        rooms={this.state.rooms}
                    />

                    <div className="wrapper">
                        <br/>
                        <button
                            className={"btn-round"}
                            onClick={this.reload}
                        >
                            <i className="now-ui-icons arrows-1_refresh-69"/>  Réinitialiser la recherche
                        </button>
                        <br/>
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
