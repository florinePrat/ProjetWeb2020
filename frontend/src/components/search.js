import React, {useEffect} from "react";
import {FormGroup, Button} from "reactstrap";
import CustomInput from "reactstrap/es/CustomInput";
import myCategories from "../utils/categories";
// reactstrap components


// core components

function SearchComponent({callbackFromParent, rooms}) {
    const [category, setCategory] = React.useState('null');
    const [city, setCity] = React.useState('null');
    const [categories, setCategories] = React.useState([]);
    const [search, setSearch] = React.useState([category, city]);

    useEffect(()=> {
        myCategories.getAllCategories()
            .then(res => {
                setCategories(res.data.category);
                console.log('my category 1', categories);
            }, function (data) {
                console.log(data);
            })
    },[]);

    const mySearch = () => {
        console.log('cat : ',category);
        console.log('cit : ',city);
        setSearch([category, city]);
    };

    useEffect(()=>{
        if (search){
            console.log('search : ',search);
            callbackFromParent(search);
        }
    },[search]);



        console.log("affichage de rooms : ", rooms);

        let optionsCategory = categories.map((data)=>
            <option
                key={data.name}>
                {data.name}
            </option>
        );

        const uniqueTags = [];
        rooms.map(data => {
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
                                    id="setCity"
                                    name="customSelect"
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
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
                                    id="setCategory"
                                    name="customSelect"
                                    value = {category}
                                    onChange={e => setCategory(e.target.value)}
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
                                    onClick={mySearch}
                                >Rechercher
                                </Button>
                            </FormGroup>
                        </div>
                    </div>
                </form>

            </>
        );
}

export default SearchComponent;
