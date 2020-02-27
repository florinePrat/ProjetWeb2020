import React, {useState} from "react";
import {Button} from "reactstrap";
import MyDatesPicker from '../OpenedDatesPicker';

export default (props) =>{
        const [dates, setDates] = useState([]);
        return <div>
            <MyDatesPicker
                dates={dates}
                setDates={setDates}
            />
            <Button color={'success'} onClick={() => console.log(dates)}>Envoyer ces dates</Button>
        </div>
};

