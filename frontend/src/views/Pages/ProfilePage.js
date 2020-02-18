import React, {useEffect} from "react";

// reactstrap components
import {
    Button,
    NavItem,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "../../components/Headers/ProfilePageHeader.js";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import Javascript from "../../components/Modals/modalCreateOtherRoom";
import RoomCard from "../../components/Cards/roomCard";
import BookingCard from "../../components/Cards/bookingCard";
import BookingOwnerCard from "../../components/Cards/bookingOwnerCard";
import auth from "../../utils/auth";
import roomApi from "../../utils/room";
import bookingApi from "../../utils/booking";


function ProfilePage() {
    const [pills, setPills] = React.useState("1");
    const [rooms, setRooms] = React.useState([]);
    const [bookingUser, setBookingUser] = React.useState([]);
    const [bookingOwner, setBookingOwner] = React.useState([]);
    const [userId] = React.useState(localStorage.getItem("userId"));
    const [bookingHidden, setBookingHidden] = React.useState(true);
    const [bookingOwnerHidden, setBookingOwnerHidden] = React.useState(true);
    const [btnBooking, setBtnBooking] = React.useState(false);
    const [btnRoom, setBtnRoom] = React.useState(false);

    React.useEffect(() => {
        document.body.classList.add("profile-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        return function cleanup() {
            document.body.classList.remove("profile-page");
            document.body.classList.remove("sidebar-collapse");
        };
    });

    useEffect(() => {
        roomApi.getRoomByUser(userId)
            .then(async rooms => {
                setRooms(rooms);
                console.log('room taille : ', rooms.length);
                const bookingUser = await bookingApi.getByUser(userId);
                setBookingUser(bookingUser);
                console.log('booking taille user : ', bookingUser.length);


                const bookingOwner = await bookingApi.getByOwner(userId);
                setBookingOwner(bookingOwner);
                console.log('booking taille owner : ', bookingOwner.length);


                setPills(bookingUser.length > 0 || bookingOwner.length > 0 && rooms.length === 0 ? "1" : "2");

                if (bookingUser.length > 0) {
                    setBookingHidden(false)
                }


                if (bookingOwner.length > 0) {
                    setBookingOwnerHidden(false)
                }


                if (bookingUser.length === 0 && bookingOwner.length === 0) {
                    setBtnBooking(true)
                }


                if (rooms.length === 0) {
                    setBtnRoom(true)
                }

            })
            .catch( function (data) {
                console.log(data);
            });


    }, [userId]);


    return (

        <>

            <ExamplesNavbar/>
            <div className="wrapper">
                <ProfilePageHeader/>
                <div className="section">
                    <Container>

                        <div className="button-container">
                            <Javascript/>
                            {/* Button to propose a room => pop a form modal : call a modalCreateOtherRoom*/}
                        </div>

                        <Row>
                            <Col className="ml-auto mr-auto" md="6">
                                <div className="nav-align-center">
                                    <Nav
                                        className="nav-pills-info nav-pills-just-icons"
                                        pills
                                        role="tablist"
                                    >
                                        <NavItem>

                                            <div hidden={btnBooking}>
                                                <Button
                                                    className={pills === "1" ? "active" : ""}
                                                    href="!#"
                                                    color='info'
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        setPills("1");
                                                    }}
                                                >
                                                    <i className="now-ui-icons education_paper"/>
                                                    Mes réservations
                                                </Button>
                                            </div>
                                        </NavItem>
                                        <NavItem>
                                            <div hidden={btnRoom}>
                                                <Button
                                                    className={pills === "2" ? "active" : ""}
                                                    href="!#"
                                                    color='success'
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        setPills("2");
                                                    }}
                                                >
                                                    <i className="now-ui-icons shopping_shop"/>
                                                    Mes salles
                                                </Button>
                                            </div>
                                        </NavItem>

                                    </Nav>
                                </div>
                            </Col>
                            <TabContent className="gallery" activeTab={"pills" + pills}>
                                <TabPane tabId="pills1">

                                    <div hidden={bookingHidden}>
                                        <h2>------ Mes réservations ------</h2>
                                        <Container>
                                            <Row>
                                                {bookingUser.map(booking => (
                                                    <Col xs={4}>
                                                        <BookingCard
                                                            _id={booking._id}
                                                            date={booking.date}
                                                            state={booking.state}
                                                            ownerId={booking.ownerId}
                                                            customerId={booking.customerId}
                                                            roomId={booking.roomId}
                                                        />
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Container>
                                    </div>
                                    <div hidden={bookingOwnerHidden}>
                                        <h2>------ Gestion de mes réservations ------</h2>
                                        <Container>
                                            <Row>
                                                {bookingOwner.map(bookingOwner => (
                                                    <Col xs={4}>
                                                        <BookingOwnerCard
                                                            _id={bookingOwner._id}
                                                            date={bookingOwner.date}
                                                            state={bookingOwner.state}
                                                            roomId={bookingOwner.roomId}
                                                            ownerId={bookingOwner.ownerId}
                                                            customerId={bookingOwner.customerId}
                                                        />
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Container>
                                    </div>
                                </TabPane>
                                <TabPane tabId="pills2">
                                    <Container>
                                        <Row>
                                            {rooms.map(room => (
                                                <Col xs={4}>
                                                    <RoomCard
                                                        _id={room._id}
                                                        title={room.title}
                                                        price={room.price}
                                                        city={room.city}
                                                        postalCode={room.postalCode}
                                                        address={room.address}
                                                        category={room.category}
                                                        bail={room.bail}
                                                        description={room.description}
                                                        imageUrl={room.imageUrl}
                                                        state={room.state}
                                                    />
                                                </Col>
                                            ))}
                                        </Row>
                                    </Container>
                                </TabPane>

                            </TabContent>
                        </Row>
                    </Container>
                </div>
                <DefaultFooter/>
            </div>
        </>
    );
}

export default ProfilePage;
