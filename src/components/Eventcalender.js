import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./EventCalendar.css";

const EventCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventName, setEventName] = useState("");
    const [events, setEvents] = useState([]);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleEventNameChange = (event) => {
        setEventName(event.target.value);
    };

    const handleCreateEvent = () => {
        if (selectedDate && eventName) {
            const newEvent = {
                id: new Date().getTime(),
                date: selectedDate,
                title: eventName,
            };
            setEvents([...events, newEvent]);
            setSelectedDate(null);
            setEventName("");
            setSelectedDate(newEvent.date);
        }
    };

    const handleUpdateEvent = (eventId, newTitle) => {
        const updatedEvents = events.map((event) =>
            event.id === eventId ? { ...event, title: newTitle } : event
        );
        setEvents(updatedEvents);
    };

    const handleDeleteEvent = (eventId) => {
        const updatedEvents = events.filter((event) => event.id !== eventId);
        setEvents(updatedEvents);
    };

    return (
        <div className="event-calendar">
            <h2>Event Calendar</h2>
            <div className="calendar-container">
                <Calendar
                    value={selectedDate}
                    onClickDay={handleDateClick}
                    tileClassName={({ date }) =>
                        selectedDate &&
                        date.toDateString() === selectedDate.toDateString()
                            ? "selected"
                            : events.some(
                                  (event) =>
                                      event.date.toDateString() ===
                                      date.toDateString()
                              )
                            ? "event-marked"
                            : ""
                    }
                />
            </div>
            {selectedDate && (
                <div className="event-form">
                    <h3>Create Event</h3>
                    <p>Selected Date: {selectedDate.toDateString()}</p>
                    <input
                        type="text"
                        placeholder="Event Name"
                        value={eventName}
                        onChange={handleEventNameChange}
                    />
                    <button onClick={handleCreateEvent}>Add Event</button>
                </div>
            )}
            {events.length > 0 && selectedDate && (
                <div className="event-list">
                    <h3>Events on {selectedDate.toDateString()}</h3>
                    {events
                        .filter(
                            (event) =>
                                event.date.toDateString() ===
                                selectedDate.toDateString()
                        )
                        .map((event) => (
                            <div key={event.id} className="event-item">
                                <p>{event.title}</p>
                                <button
                                    onClick={() =>
                                        handleUpdateEvent(
                                            event.id,
                                            prompt("Enter new title")
                                        )
                                    }
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDeleteEvent(event.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default EventCalendar;
