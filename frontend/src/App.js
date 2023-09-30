import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function App() {

  const [events, setEvents] = useState([]);

  const fetchEvents = (start, stop) => {
    fetch(process.env.REACT_APP_API_URL+'events?start='+start+'&stop='+stop)
    .then((res) => res.json())
    .then( (data) => {
     setEvents(prepareDates(data))
    }
    );
  }
  
  const prepareDates = (data) => {
    data.map( (data) => { data.start = new Date(data.start); data.end = new Date(data.end); return data})

    return data;
  }

  useEffect( () => {
    fetchEvents(moment().startOf('month').toISOString(), moment().endOf('month').toISOString());
  }, []);


  const onMonthChange = (date,type,direction) => {
    fetchEvents(moment(date).startOf('month').toISOString(), moment(date).endOf('month').toISOString());
  }

  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: "100vh" }}
        showAllEvents={false}
        onNavigate={onMonthChange}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );

}

export default App;
