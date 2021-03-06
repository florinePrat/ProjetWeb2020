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
import CreateRoom from "../../components/Modals/modalCreateOtherRoom";
import RoomCard from "../../components/Cards/roomCard";
import BookingCard from "../../components/Cards/bookingCard";
import BookingOwnerCard from "../../components/Cards/bookingOwnerCard";
import roomApi from "../../utils/room";
import bookingApi from "../../utils/booking";
import CardDeck from "react-bootstrap/CardDeck";
import CardColumns from "react-bootstrap/CardColumns";


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
    },[]);

    useEffect(() => {
       roomApi.getRoomByUser(userId)
            .then(async rooms => {
                setRooms(rooms);
                console.log('room taille : ', rooms.length);
                console.log('room iddddd : ', rooms);
                const bookingUser = await bookingApi.getByUser(userId);
                setBookingUser(bookingUser);
                console.log('booking taille user : ', bookingUser.length);


                const bookingOwnerz = await bookingApi.getByOwner(userId);
                setBookingOwner(bookingOwnerz);
                console.log('booking taille owner : ', bookingOwnerz.length);


                setPills(bookingUser.length > 0 || bookingOwnerz.length > 0 && rooms.length === 0 ? "1" : "2");

                if (bookingUser.length > 0) {
                    setBookingHidden(false)
                }


                if (bookingOwnerz.length > 0) {
                    setBookingOwnerHidden(false)
                }


                if (bookingUser.length === 0 && bookingOwnerz.length === 0) {
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
    console.log(bookingUser);

    return (

        <>

            <ExamplesNavbar/>
            <div className="wrapper">
                <ProfilePageHeader/>
                <div className="section">
                    <Container>

                        <div className="button-container">
                            <CreateRoom
                                onCreated={(room)=>{
                                    setRooms([...rooms, room])
                                }}
                            />
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
                                                    My bookings
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
                                                    My rooms
                                                </Button>
                                            </div>
                                        </NavItem>

                                    </Nav>
                                </div>
                            </Col>
                            <TabContent className="gallery" activeTab={"pills" + pills}>
                                <TabPane tabId="pills1">

                                    <div hidden={bookingHidden}>

                                        <h2><img src={require("assets/img/month.png")} height={180}/> My bookings </h2>
                                        <Container>
                                            <Row>
                                                {bookingUser.length?
                                                    bookingUser.map(booking => (
                                                    <CardDeck>
                                                        <BookingCard
                                                            _id={booking._id}
                                                            date={booking.date}
                                                            state={booking.state}
                                                            ownerId={booking.ownerId}
                                                            customerId={booking.customerId}
                                                            roomId={booking.roomId}
                                                            onDeleted={()=>{
                                                                setBookingUser(bookingUser.filter(b =>{
                                                                    return b._id !== booking._id
                                                                }))
                                                            }}
                                                            onAddReview={()=>{
                                                                setBookingUser(bookingUser.filter(b =>{
                                                                    return b._id !== booking._id
                                                                }))
                                                            }}
                                                        />
                                                    </CardDeck>
                                                ))
                                                : null}
                                            </Row>
                                        </Container>
                                    </div>
                                    {bookingOwner.length ?
                                        <div>
                                        <h2><img src={require("assets/img/booking.png")} height={180}/> Management of my bookings </h2>
                                        <Container>
                                            <Row>
                                                {bookingOwner ?
                                                    bookingOwner.map((b1) => (
                                                    <CardDeck>
                                                        <BookingOwnerCard
                                                            _id={b1._id}
                                                            date={b1.date}
                                                            state={b1.state}
                                                            roomId={b1.roomId}
                                                            ownerId={b1.ownerId}
                                                            customerId={b1.customerId}
                                                            onResponse={(response)=>{
                                                                setBookingOwner(bookingOwner.filter(b =>{
                                                                    return b._id !== b1._id
                                                                }))
                                                            }}
                                                        />
                                                    </CardDeck>
                                                ))
                                                : null}
                                            </Row>
                                        </Container>
                                    </div>
                                        :null}
                                </TabPane>
                                <TabPane tabId="pills2">
                                    <div>
                                    <h2><img src={require("assets/img/logout.png")} height={130}/> My rooms </h2>
                                    <Container>
                                        <Row>
                                            {rooms ?
                                                rooms.map(room => (
                                                <CardDeck>
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
                                                        onPublishStateUpdate={(state)=>{
                                                            setRooms(rooms.map(r =>
                                                                r._id === room._id
                                                                    ? {...r, state}
                                                                    : r

                                                            ))
                                                        }}
                                                        onUpdated={(res)=>{
                                                            setRooms(rooms.map(r =>
                                                                r._id === room._id
                                                                    ? {...r, ...res}
                                                                    : r
                                                            ))
                                                        }}
                                                        onDeleted={()=>{
                                                            setRooms(rooms.filter(r =>{
                                                                return r._id !== room._id
                                                            }))
                                                        }}
                                                    />
                                                </CardDeck>
                                            ))
                                            : null}
                                        </Row>
                                    </Container>
                                    </div>
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
