import React, {useEffect} from "react";

// core components
import LandingPageHeader from "../../components/Headers/LandingPageHeader.js";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import RoomCard from "../../components/Cards/roomCardForLanding";
import {Col, Container, Row} from "react-bootstrap";
import room from "../../utils/room";
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar";
import AccueilNavbar from "../../components/Navbars/AccueilNavbar";
import auth from "../../utils/auth";

function LandingPage() {
    const [rooms, setRooms] = React.useState([]);
    const [isAuth] = React.useState(auth.isAuth());

    useEffect(() =>{
        room.getAllRooms()
            .then(res => {
                const myRooms = res.data.room;
                setRooms(myRooms);
                console.log("roomlanding : ", rooms)
            }, function (data) {
                console.log(data);
            })
    }, []);

    React.useEffect(() => {
        document.body.classList.add("landing-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        return function cleanup() {
            document.body.classList.remove("landing-page");
            document.body.classList.remove("sidebar-collapse");
        };
    });

    const myCallback = (search) => {

        room.getAllSearchRooms(search[0], search[1]).then(res => {
            const myRooms = res.data.room;
            console.log('je suis bien dans la requette send ! ');
            console.log(search[0]);
            console.log(search[1]);
            console.log("room : ", myRooms);
            setRooms(myRooms)
        }, error => {
            console.log(error)
        })
    };

    const reload = () => {
        room.getAllRooms()
            .then(res => {
                const myRooms = res.data.room;
                setRooms(myRooms)
            }, function (data) {
                console.log(data);
            })
    };




        return (
            <>
                {isAuth ? <ExamplesNavbar/> : <AccueilNavbar/>}

                <div className="wrapper">
                    <LandingPageHeader
                        update={myCallback}
                        rooms={rooms}
                    />

                    <div className="wrapper">
                        <br/>
                        <button
                            className={"btn-round"}
                            onClick={reload}
                        >
                            <i className="now-ui-icons arrows-1_refresh-69"/>  Réinitialiser la recherche
                        </button>
                        <br/>
                        <br/>
                        <Container>
                            <Row>
                                {rooms ?
                                    rooms.map(room => (
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
                                                userId={room.userId}
                                                reviews={room.reviews}
                                            />
                                        </Col>

                                    ))
                                    : null
                                }
                            </Row>
                        </Container>
                        <DefaultFooter/>
                    </div>
                </div>
            </>
        );

}

export default LandingPage;
