import React, { useState } from 'react';
import { CssBaseline, Container, Grid, Box, ButtonGroup, Button } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Filters from './Filters';
import EventsList from './EventsList';
import EventDetail from './EventDetail';
import cseimg from './assets/images/cseevent.jpg';
import cllgimg from './assets/images/cllg.jpg';
import libimg from './assets/images/lib.jpg';

const EventPage = () => {
  const dummyEvents = [
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

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events] = useState(dummyEvents);
  const [filteredEvents, setFilteredEvents] = useState(dummyEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetailOpen, setEventDetailOpen] = useState(false);
  const [sortOption, setSortOption] = useState('all');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const searchEvents = (searchText) => {
    const filtered = events.filter((event) => event.name.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredEvents(filtered);
  };

  const filterCategory = (category) => {
    const filtered = category === 'all' ? events : events.filter((event) => event.category === category);
    setFilteredEvents(filtered);
  };

  const filterDepartment = (department) => {
    const filtered = department === 'all' ? events : events.filter((event) => event.department === department);
    setFilteredEvents(filtered);
  };

  const toggleOnline = (online) => {
    const filtered = online ? events.filter((event) => event.type === 'online') : events;
    setFilteredEvents(filtered);
  };

  const togglePaid = (paid) => {
    const filtered = paid ? events.filter((event) => event.price !== 'Free') : events;
    setFilteredEvents(filtered);
  };

  const showEventDetail = (event) => {
    setSelectedEvent(event);
    setEventDetailOpen(true);
  };

  const closeEventDetail = () => {
    setEventDetailOpen(false);
    setSelectedEvent(null);
  };

  const handleSortChange = (sortOption) => {
    setSortOption(sortOption);
  };

  const getSortedEvents = () => {
    const currentDate = new Date();
    let sortedEvents = [...filteredEvents];
    switch (sortOption) {
      case 'live':
        return sortedEvents.filter(event => event.status === 'live');
      case 'upcoming':
        return sortedEvents.filter(event => new Date(event.date) > currentDate);
      case 'past':
        return sortedEvents.filter(event => new Date(event.date) < currentDate);
      default:
        return sortedEvents;
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', color: '#333' }}>
      <CssBaseline />
      <Header toggleSidebar={toggleSidebar} searchEvents={searchEvents} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {/* <Container style={{ marginLeft:'10px'}}> */}
        <Grid container spacing={3}>
          <Grid item xs={10} md={3} style={{ marginLeft: '15px' }}>
            <Filters
              filterCategory={filterCategory}
              filterDepartment={filterDepartment}
              toggleOnline={toggleOnline}
              togglePaid={togglePaid}
            />
          </Grid>
          <Grid item xs={20} md={8} style={{ paddingTop: '50px', width:'full'}}>
            <ButtonGroup  variant="contained" aria-label="outlined primary button group" >
              <Button style={{ backgroundColor: "grey", borderColor: '#fefefe59'}} onClick={() => handleSortChange('all')}>All</Button>
              <Button style={{ backgroundColor: "grey", borderColor: '#fefefe59' }} onClick={() => handleSortChange('live')}>Live</Button>
              <Button style={{ backgroundColor: "grey", borderColor: '#fefefe59' }} onClick={() => handleSortChange('upcoming')}>Upcoming</Button>
              <Button style={{ backgroundColor: "grey", borderColor: '#fefefe59' }} onClick={() => handleSortChange('past')}>Past</Button>
            </ButtonGroup>
            <Box mt={4}  style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}>
              <EventsList events={getSortedEvents()} showEventDetail={showEventDetail} />
            </Box>
          </Grid>
        </Grid>
      {/* </Container> */}
      {selectedEvent && (
        <EventDetail event={selectedEvent} open={eventDetailOpen} handleClose={closeEventDetail} />
      )}
    </div>
  );
};

export default EventPage;