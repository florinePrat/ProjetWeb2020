import {Component} from "react";
import React from "react";
import {Button} from "react-bootstrap";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import {tokenHeaders} from "../../../utils/headers";
import axios from 'axios';
const burl = "http://localhost:3000/api/room";
// this class send a answer to back for verify the answer and done the card of the day
class roomCard extends Component{


    constructor(props) {
        super(props);
        console.log("propriete"+props._id);
        this.state = {
            isDeployed: false,
            edit : false,
        };
        this.delete.bind(this);
        this.edit.bind(this);
    }
    delete=event =>{
        axios.delete(burl + '/'+this.props._id, { headers: tokenHeaders})
            .then(res =>{
                window.location = "/manag-room-page";
                console.log('objet supprimer !')
            })
    };
    edit = event => {

    };

    render(){
        console.log("my props : ",this.props);
        return(
            this.state.isDeployed
                ? <div>
                    <card>
                        <CardBody>
                            {/* <h3 style={{backgroundColor:this.props.labels[0].color}}> {this.props.labels[0].name}</h3>*/}
                            <p>prix : {this.props.price} </p>
                            <p>city : {this.props.city} </p>

                            <Button
                                className="btn-info"
                                onClick={()=>{
                                    this.setState({edit : true});

                                }}
                                bssize="large"
                            >
                                modifier
                            </Button>
                            <Button
                                className="btn-info"
                                onClick={ this.delete }
                                bssize="large"
                            >
                                supprimer
                            </Button>
                            <Button
                                className="btn-info"
                                onClick={()=>{
                                    this.setState({isDeployed:false});
                                }}
                                bssize="large"
                            >
                                retour
                            </Button>
                        </CardBody>
                    </card>
                </div>
                : <div>
                    <card>
                        <CardBody>
                            <CardTitle>Annonce : {this.props.title}</CardTitle>
                        </CardBody>
                        <CardBody>
                            <Button
                                className="btn-info"
                                onClick={()=>{
                                    this.setState({isDeployed:true})
                                }}
                                bssize="large"
                            >
                                Voir
                            </Button>
                        </CardBody>
                    </card>
                </div>

        )
    }
}
export default roomCard;
