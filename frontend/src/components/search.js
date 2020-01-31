import React from "react";
import room from "../utils/room";
import {FormGroup, Button} from "reactstrap";
import CustomInput from "reactstrap/es/CustomInput";
// reactstrap components

// core components
class SearchComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: 'null',
            city: 'null',
            rooms:[],
        };
        this.handleChange = this.handleChange.bind(this);
        this.mySearch = this.mySearch.bind(this);
    }

    mySearch = () => {
        console.log('cat : ',this.state.category);
        console.log('cit : ',this.state.city);
        this.state = {search :[ this.state.category, this.state.city]};
        console.log('search : ',this.state.search);
        this.props.callbackFromParent(this.state.search);
    };


   /* send = event => {
            room.getAllSearchRooms(this.state.category, this.state.city).then(res => {
                const rooms = res;
                console.log('je suis bien dans la requette send ! ');
                console.log(this.state.category);
                console.log(this.state.city);
                this.setState({rooms : rooms});
                console.log("room : ", res)
            }, error => {
                console.log(error)
            })

    };*/

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };


    render() {
        return (
            <>

                <form>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <FormGroup controlId="city">
                                <CustomInput
                                    type="select"
                                    id="city"
                                    name="customSelect"
                                    value={this.state.city}
                                    onChange={this.handleChange}
                                >
                                    <option>Où ?</option>
                                    <option>Montpellier</option>
                                    <option>Alès</option>
                                </CustomInput>
                            </FormGroup>
                        </div>

                        <div className="form-group col-md-4">
                            <FormGroup controlId="category">
                                <CustomInput
                                    type="select"
                                    id="category"
                                    name="customSelect"
                                    value={this.state.category}
                                    onChange={this.handleChange}
                                >
                                    <option>Type de salle</option>
                                    <option>Salle de fêtes (soirée, anniverssaire..)</option>
                                    <option>Salle de réunions pro</option>
                                    <option>Salle de coworking</option>
                                    <option>Salle de restaurant</option>
                                    <option>Mariage</option>
                                    <option>Garage</option>
                                    <option>Hangar</option>
                                </CustomInput>

                            </FormGroup>
                        </div>
                        <div className="form-group col-md-1">
                            <FormGroup>
                                <Button
                                    className='btn-round'
                                    color='info'
                                    onClick={this.mySearch}
                                >Rechercher
                                </Button>
                            </FormGroup>
                        </div>
                    </div>
                </form>

            </>
        );
    }
}

export default SearchComponent;
