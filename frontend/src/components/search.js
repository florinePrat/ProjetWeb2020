import React from "react";
import {FormGroup, Button} from "reactstrap";
import CustomInput from "reactstrap/es/CustomInput";
import categories from "../utils/categories";
// reactstrap components


// core components
class SearchComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: 'null',
            city: 'null',
            rooms:[],
            categories:[],
        };
        this.handleChange = this.handleChange.bind(this);
        this.mySearch = this.mySearch.bind(this);
    }

    componentWillMount(){
        categories.getAllCategories()
            .then(res => {
                const categories = res.data;
                console.log('my category 1', categories);
                this.setState({categories:categories});
            }, function (data) {
                console.log(data);
            })
    }

    mySearch = () => {
        console.log('cat : ',this.state.category);
        console.log('cit : ',this.state.city);
        this.state = {search :[ this.state.category, this.state.city]};
        console.log('search : ',this.state.search);
        this.props.callbackFromParent(this.state.search);
    };


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };


    render() {

        console.log("affichage de rooms : ", this.props.rooms);

        let categories = this.state.categories;
        let optionsCategory = categories.map((data)=>
            <option
                key={data.name}>
                {data.name}
            </option>
        );

        const uniqueTags = [];
        this.props.rooms.map(data => {
            if (uniqueTags.indexOf(data.city) === -1) {
                uniqueTags.push(data.city)
            }
        });

        let optionsCities = uniqueTags.map((data)=>
            <option
                key={data}>
                {data}
            </option>
        );

        console.log("test des villes en bd", uniqueTags);

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
                                    <option>Ville</option>
                                    {optionsCities}
                                </CustomInput>
                            </FormGroup>
                        </div>

                        <div className="form-group col-md-4">
                            <FormGroup controlId="category">
                                <CustomInput
                                    type="select"
                                    id="category"
                                    name="customSelect"
                                    value = {this.state.category}
                                    onChange={this.handleChange}
                                >
                                    <option >Categorie</option>
                                    {optionsCategory}
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
