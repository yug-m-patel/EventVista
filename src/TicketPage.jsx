import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import EventList from './EventsList';
import EventDetail from './EventDetail';
import cseimg from './assets/images/cseevent.jpg';
import cllgimg from './assets/images/cllg.jpg';
import libimg from './assets/images/lib.jpg';

const events = [
    {
      name: "CSE Event 1",
      date: "2024-07-01",
      price: "Free",
      description: "Description 1",
      category: "workshops",
      department: "cse",
      type: "online",
      status: "live",
      Image: cseimg
    },
    {
      name: "Medical Event 1",
      date: "2024-08-01",
      price: "$10",
      description: "Description 2",
      category: "seminars",
      department: "medical",
      type: "offline",
      status: "upcoming",
      Image: libimg
    },
    {
      name: "Fun Event 1",
      date: "2024-06-01",
      price: "Free",
      description: "Description 3",
      category: "sports",
      department: "mechanical",
      type: "online",
      status: "past",
      Image: cllgimg
    },
    {
      name: "CSE Event 2",
      date: "2024-07-31",
      price: "Free",
      description: "Description 1",
      category: "workshops",
      department: "cse",
      type: "online",
      status: "live",
      Image: cseimg
    },
    {
      name: "Electrical Event 1",
      date: "2024-08-015",
      price: "$10",
      description: "Description 1",
      category: "seminars",
      department: "Electrical",
      type: "offline",
      status: "upcoming",
      Image: libimg
    },
    {
      name: "Fun Event 2",
      date: "2024-06-01",
      price: "Free",
      description: "Description 3",
      category: "sports",
      department: "all",
      type: "online",
      status: "past",
      Image: cllgimg
    }
  ];

const TicketPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventDetailOpen, setEventDetailOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const searchEvents = (query) => {
    setSearchQuery(query);
  };

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const liveEvents = filteredEvents.filter(event => event.status === 'live');
  const upcomingEvents = filteredEvents.filter(event => event.status === 'upcoming');
  const pastEvents = filteredEvents.filter(event => event.status === 'past');

  const showEventDetail = (event) => {
    setSelectedEvent(event);
    setEventDetailOpen(true);
  };

  const handleCloseEventDetail = () => {
    setEventDetailOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header toggleSidebar={toggleSidebar} searchEvents={searchEvents} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '20px', backgroundColor: '#f4f4f4', overflowY: 'auto' }}>
        <h2>Live Events</h2>
        <EventList events={liveEvents} showEventDetail={showEventDetail} />
        <h2>Upcoming Events</h2>
        <EventList events={upcomingEvents} showEventDetail={showEventDetail} />
        <h2>Past Events</h2>
        <EventList events={pastEvents} showEventDetail={showEventDetail} />
      </main>
      {selectedEvent && (
        <EventDetail event={selectedEvent} open={isEventDetailOpen} handleClose={handleCloseEventDetail} />
      )}
    </div>
  );
};

export default TicketPage;
