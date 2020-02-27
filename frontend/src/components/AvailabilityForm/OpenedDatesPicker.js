import DateRangeForm from "./DateRangeForm";
import {Button} from "reactstrap";
import React, {useState} from "react";
import moment from "moment"

export default ({dates, setDates})=>{
        const [currentDate, setCurrentDate] = useState(false);
        return <div>
            {dates.map(date =>
                <div>
                    Début : <p>{moment(date.start).format("DD MM YYYY HH:mm")}</p> Fin : <p>{moment(date.end).format("DD MM YYYY HH:mm")}</p>
                </div>)}
            <DateRangeForm
                onSelectedChange={(date) => setCurrentDate(date)}
            />
            <Button color={'info'} onClick={() => {
                setDates([...dates, currentDate])
            }} >Sauvegarder</Button>
        </div>
};


