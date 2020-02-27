import React, {useState} from "react";
// reactstrap components

import {Table} from "react-bootstrap";
import moment from 'moment';
import 'react-daterange-picker/dist/css/react-calendar.css';

const DayPicker = ({id, label, onStartTimeChange, onEndTimeChange}) => {
    const [timeRange, setTimeRange] = useState([{
        start: false,
        end: false
    }]);
    return  <tr id={id}>
        <td>{label}</td>
        <td>
            <input type={"time"}
                   value={timeRange.start && timeRange.start.format("HH:mm")}
                   onChange={event => {
                       const splitValue = event.target.value.split(":");
                       const hours = splitValue[0];
                       const minutes = splitValue[1];
                       setTimeRange({...timeRange, start:  moment().set("hours", hours).set("minutes", minutes)})
                       onStartTimeChange(moment().set("hours", hours).set("minutes", minutes))
                   }}/></td>
        <td><input type={"time"}
                   value={timeRange.end && timeRange.end.format("HH:mm")}
                   onChange={event => {
                       const splitValue = event.target.value.split(":");
                       const hours = splitValue[0];
                       const minutes = splitValue[1];
                       setTimeRange({...timeRange, end:  moment().set("hours", hours).set("minutes", minutes)})
                       onEndTimeChange(moment().set("hours", hours).set("minutes", minutes))
                   }}/></td>
    </tr>
};

const OpenedWeekDayPicker = ({weekDays, setWeekDays}) => {
    return <Table responsive>
        <thead>
        <tr>
            <th>Jour de la semaine</th>
            <th>horaire de début</th>
            <th>horaire de fin</th>
        </tr>
        </thead>
        <tbody>
        {weekDays.map(day => <DayPicker
         id={day.id}
         label={day.label}
         onStartTimeChange={time => setWeekDays(weekDays.map(weekDay => weekDay.id === day.id
         ? {...weekDay, startTime: time}
         : weekDay))}
         onEndTimeChange={time => setWeekDays(weekDays.map(weekDay => weekDay.id === day.id
             ? {...weekDay, endTime: time}
             : weekDay))}
        />)}
        </tbody>
    </Table>
};

const OpenedDayPickerContainer = (props) => {
    const [weekDays, setWeekDays] = useState([
        {id: 0, label: "Lundi", startTime: false, endTime: false},
        {id:1, label: "Mardi", startTime: false, endTime: false},
        {id: 2, label: "Mercredi", startTime: false, endTime: false},
        {id: 3, label: "Jeudi", startTime: false, endTime: false},
        {id: 4, label: "Vendredi", startTime: false, endTime: false},
        {id: 5, label: "Samedi", startTime: false, endTime: false},
        {id: 6, label: "Dimanche", startTime: false, endTime: false},
    ]);
    return <OpenedWeekDayPicker
    weekDays={weekDays}
    setWeekDays={setWeekDays}
    />
};

export default OpenedDayPickerContainer
