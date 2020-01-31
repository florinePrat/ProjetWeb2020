import React from "react";
import axios from 'axios';
import {tokenHeaders} from '../../../utils/headers';
import RoomCard from './roomCard';
// reactstrap components
import auth from "../../../utils/auth";
import DefaultFooter from "../../../components/Footers/DefaultFooter";
import LandingPageHeader from "../../../components/Headers/LandingPageHeader";
import ExamplesNavbar from "../../../components/Navbars/ExamplesNavbar";



// core components
//let pageHeader= React.createRef();
const burl = "http://localhost:3000/api/room";

class roomPage extends React.Component{



    constructor(props) {
        super(props);
        this.state = {
            isAuth : auth.isAuth(),
            rooms:[]
        };
    }

    componentDidMount() {

        axios.get(burl + '/',{
            headers: tokenHeaders
        } )
            .then(res => {
                const rooms = res.data;
                console.log('my data',rooms[0]);
                this.setState({ rooms });
            }, function(data){
                console.log(data);
            })
    }


    /*handleNavbar(function(){
        return{
            const [firstFocus, setFirstFocus] = React.useState(false);
        const [lastFocus, setLastFocus] = React.useState(false);
        React.useEffect(() => {
            document.body.classList.add("landing-page");
            document.body.classList.add("sidebar-collapse");
            document.documentElement.classList.remove("nav-open");
            return function cleanup() {
                document.body.classList.remove("landing-page");
                document.body.classList.remove("sidebar-collapse");
            };
        });
        const [iconPills, setIconPills] = React.useState("1");
        }
    })*/


    render(){


        return (
            <>
                <ExamplesNavbar />
                <div className="wrapper">
                    <LandingPageHeader />

                        {this.state.rooms.map(room =>
                            <RoomCard
                                _id={room._id}
                                title={room.title}
                                price={room.price}
                                city={room.city}
                            />
                        )}
                    <DefaultFooter />
                </div>
            </>
        );
    }}

export default roomPage;
