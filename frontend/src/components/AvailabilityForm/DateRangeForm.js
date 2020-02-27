import React, {useEffect, useState} from "react";
// reactstrap components
import {
    Button,
} from "reactstrap";

import moment from 'moment';
import 'react-daterange-picker/dist/css/react-calendar.css';
import 'react-day-picker/lib/style.css';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

const MyDatePicker = ({onDateSelected, CustomInput, minDate}) => {
    const [startDate, setStartDate] = useState(new Date());
    return  <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        minDate={minDate}
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
        onCalendarClose={() => onDateSelected(startDate)}
        customInput={<CustomInput />}
    />
};

export default ({ onSelectedChange }) => {
    const [date, setDate] = useState({
        start: false,
        end: false
    });
    useEffect(() => {
        if(date.start && date.end){
            onSelectedChange(date)
        }
    }, [date]);
    return <div>
            <MyDatePicker
             onDateSelected={(newDate) => {
                setDate({
                    ...date,
                    start: newDate
                })
             }}
             CustomInput={({ value, onClick }) => (
                 <Button onClick={onClick}>
                     Date et horaire de début : {date.start && moment(date.start).format("DD MM YYYY HH:mm")}
                 </Button>
             )}
            />
            <MyDatePicker
                onDateSelected={(newDate) => {
                    setDate({
                        ...date,
                        end: newDate
                    })
                }}
                CustomInput={({ value, onClick }) => (
                    <Button onClick={onClick} hidden={!date.start}>
                        Date et horaire de fin : {date.end && moment(date.end).format("DD MM YYYY HH:mm")}
                    </Button>
                )}
                minDate={date.start}
            />
    </div>
}
