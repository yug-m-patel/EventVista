// import React, { useState } from 'react';
// import { CssBaseline, Container, Grid, Box, ButtonGroup, Button } from '@mui/material';
// import Header from './Header';
// import Sidebar from './Sidebar';
// import Filters from './Filters';
// import EventsList from './EventsList';
// import EventDetail from './EventDetail';
// import cseimg from './assets/images/cseevent.jpg';
// import cllgimg from './assets/images/cllg.jpg';
// import libimg from './assets/images/lib.jpg';
// import Annual from './assets/images/EVENTPAGE1.jpg';
// import Ele from './assets/images/Ele.jpg';
// import Medical from './assets/images/AiSci.png';
// import Sports from './assets/images/Sports.png';
// import Web from './assets/images/webdev.png';
// import axios from 'axios';

// const EventPage = () => {
//   const dummyEvents = [
//     {
//       name: "CSE Event 1",
//       date: "2024-07-01",
//       price: "Free",
//       description: "Description 1",
//       category: "workshops",
//       department: "cse",
//       type: "online",
//       status: "live",
//       Image: Annual
//     },
//     {
//       name: "Medical Event 1",
//       date: "2024-08-01",
//       price: "$10",
//       description: "Description 2",
//       category: "seminars",
//       department: "medical",
//       type: "offline",
//       status: "upcoming",
//       Image: Medical
//     },
//     {
//       name: "Fun Event 1",
//       date: "2024-06-01",
//       price: "Free",
//       description: "Description 3",
//       category: "sports",
//       department: "mechanical",
//       type: "online",
//       status: "past",
//       Image: Sports
//     },
//     {
//       name: "CSE Event 2",
//       date: "2024-10-31",
//       price: "Free",
//       description: "Description 1",
//       category: "workshops",
//       department: "cse",
//       type: "online",
//       status: "live",
//       Image: Web
//     },
//     {
//       name: "Electrical Event 1",
//       date: "2024-08-015",
//       price: "$10",
//       description: "Description 1",
//       category: "seminars",
//       department: "Electrical",
//       type: "offline",
//       status: "upcoming",
//       Image: Ele
//     },
//     {
//       name: "Fun Event 2",
//       date: "2024-06-01",
//       price: "Free",
//       description: "Description 3",
//       category: "sports",
//       department: "all",
//       type: "online",
//       status: "past",
//       Image: cllgimg
//     }
//   ];
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [events, setEvents] = useState(dummyEvents);
//   const [filteredEvents, setFilteredEvents] = useState(dummyEvents);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [eventDetailOpen, setEventDetailOpen] = useState(false);
//   const [sortOption, setSortOption] = useState('all');
    
//   // useEffect(() => {
//   //   const fetchEvents = async () => {
//   //     try {
//   //       const response = await axios.get('https://eventvista.onrender.com/api/event/fetch'); // Adjust the URL as needed
//   //       const backendEvents = response.data.map(event => ({
//   //         name: event.EventTitle,
//   //         date: event.Date,
//   //         price: event.PaidFee,
//   //         description: event.Description,
//   //         category: event.Type,
//   //         department: event.Department,
//   //         type: event.Mode,
//   //         status: event.status,
//   //         Image: event.Thumbnail
//   //         // Ensure the backend provides the correct image URL or path
//   //       }));
//   //       setEvents([...dummyEvents, ...backendEvents]);
//   //       setFilteredEvents([...dummyEvents, ...backendEvents]);
//   //     } catch (error) {
//   //       console.error('Error fetching events:', error);
//   //     }
//   //   };

//   //   fetchEvents();
//   // }, []);
  
  

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   const searchEvents = (searchText) => {
//     const filtered = events.filter((event) => event.name.toLowerCase().includes(searchText.toLowerCase()));
//     setFilteredEvents(filtered);
//   };

//   const filterCategory = (category) => {
//     const filtered = category === 'all' ? events : events.filter((event) => event.category === category);
//     setFilteredEvents(filtered);
//   };

//   const filterDepartment = (department) => {
//     const filtered = department === 'all' ? events : events.filter((event) => event.department === department);
//     setFilteredEvents(filtered);
//   };

//   const toggleOnline = (online) => {
//     const filtered = online ? events.filter((event) => event.type === 'online') : events;
//     setFilteredEvents(filtered);
//   };

//   const togglePaid = (paid) => {
//     const filtered = paid ? events.filter((event) => event.price !== 'Free') : events;
//     setFilteredEvents(filtered);
//   };

//   const showEventDetail = (event) => {
//     setSelectedEvent(event);
//     setEventDetailOpen(true);
//   };

//   const closeEventDetail = () => {
//     setEventDetailOpen(false);
//     setSelectedEvent(null);
//   };

//   const handleSortChange = (sortOption) => {
//     setSortOption(sortOption);
//   };

//   const getSortedEvents = () => {
//     const currentDate = new Date();
//     let sortedEvents = [...filteredEvents];
//     switch (sortOption) {
//       case 'live':
//         return sortedEvents.filter(event => event.status === 'live');
//       case 'upcoming':
//         return sortedEvents.filter(event => new Date(event.date) > currentDate);
//       case 'past':
//         return sortedEvents.filter(event => new Date(event.date) < currentDate);
//       default:
//         return sortedEvents;
//     }
//   };

//   return (
//     <div style={{ backgroundColor: '#f0f0f0', color: '#333' }}>
//       <CssBaseline />
//       <Header toggleSidebar={toggleSidebar} searchEvents={searchEvents} />
//       <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
//       {/* <Container style={{ marginLeft:'10px'}}> */}
//         <Grid container spacing={3}>
//           <Grid item xs={10} md={3} style={{ marginLeft: '15px' }}>
//             <Filters
//               filterCategory={filterCategory}
//               filterDepartment={filterDepartment}
//               toggleOnline={toggleOnline}
//               togglePaid={togglePaid}
//             />
//           </Grid>
//           <Grid item xs={20} md={8} style={{ paddingTop: '50px', width:'full'}}>
//             <ButtonGroup  variant="contained" aria-label="outlined primary button group" >
//               <Button style={{ backgroundColor: "grey", borderColor: '#fefefe59'}} onClick={() => handleSortChange('all')}>All</Button>
//               <Button style={{ backgroundColor: "grey", borderColor: '#fefefe59' }} onClick={() => handleSortChange('live')}>Live</Button>
//               <Button style={{ backgroundColor: "grey", borderColor: '#fefefe59' }} onClick={() => handleSortChange('upcoming')}>Upcoming</Button>
//               <Button style={{ backgroundColor: "grey", borderColor: '#fefefe59' }} onClick={() => handleSortChange('past')}>Past</Button>
//             </ButtonGroup>
//             <Box mt={4}  style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}>
//               <EventsList events={getSortedEvents()} showEventDetail={showEventDetail} />
//             </Box>
//           </Grid>
//         </Grid>
//       {/* </Container> */}
//       {selectedEvent && (
//         <EventDetail event={selectedEvent} open={eventDetailOpen} handleClose={closeEventDetail} />
//       )}
//     </div>
//   );
// };

// export default EventPage;

import React, { useState, useEffect } from 'react';
import { CssBaseline, Container, Grid, Box, ButtonGroup, Button } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Filters from './Filters';
import EventsList from './EventsList';
import EventDetail from './EventDetail';
import axios from 'axios';

const EventPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetailOpen, setEventDetailOpen] = useState(false);
  const [sortOption, setSortOption] = useState('all');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://eventvista.onrender.com/api/event/fetch');
      console.log(response + "res data");
      
      setEvents(response.data.data);
      setFilteredEvents(response.data.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const searchEvents = (searchText) => {
    const filtered = events.filter((event) => event.EventTitle.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredEvents(filtered);
  };

  const filterCategory = (category) => {
    const filtered = category === 'all' ? events : events.filter((event) => event.Type.toLowerCase() == category);
    setFilteredEvents(filtered);
  };

  const filterDepartment = (department) => {
    const filtered = department === 'all' ? events : events.filter((event) => event.Department.toLowerCase() == department);
    setFilteredEvents(filtered);
  };

  const toggleOnline = (online) => {
    const filtered = online ? events.filter((event) => event.Mode === 'Online') : events;
    setFilteredEvents(filtered);
  };

  const togglePaid = (paid) => {
    const filtered = paid ? events.filter((event) => event.Fee !== 'Free') : events;
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
    let sortedEvents = Array.isArray(filteredEvents) ? [...filteredEvents] : [];
    switch (sortOption) {
      case 'live':
        return sortedEvents.filter(event => event.status === 'live');
      case 'upcoming':
        return sortedEvents.filter(event => new Date(event.Date) > currentDate);
      case 'past':
        return sortedEvents.filter(event => new Date(event.Date) < currentDate);
      default:
        return sortedEvents;
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', color: '#333' }}>
      <CssBaseline />
      <Header toggleSidebar={toggleSidebar} searchEvents={searchEvents} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Grid container spacing={3}>
        <Grid item xs={10} md={3} style={{ marginLeft: '15px' }}>
          <Filters
            filterCategory={filterCategory}
            filterDepartment={filterDepartment}
            toggleOnline={toggleOnline}
            togglePaid={togglePaid}
          />
        </Grid>
        <Grid item xs={20} md={8} style={{ paddingTop: '50px', width: 'full' }}>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button style={{ backgroundColor: "grey", borderColor: '#fefefe59' }} onClick={() => handleSortChange('all')}>All</Button>
            <Button style={{ backgroundColor: "grey", borderColor: '#fefefe59' }} onClick={() => handleSortChange('live')}>Live</Button>
            <Button style={{ backgroundColor: "grey", borderColor: '#fefefe59' }} onClick={() => handleSortChange('upcoming')}>Upcoming</Button>
            <Button style={{ backgroundColor: "grey", borderColor: '#fefefe59' }} onClick={() => handleSortChange('past')}>Past</Button>
          </ButtonGroup>
          <Box mt={4} style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}>
            <EventsList events={getSortedEvents()} showEventDetail={showEventDetail} />
          </Box>
        </Grid>
      </Grid>
      {selectedEvent && (
        <EventDetail event={selectedEvent} open={eventDetailOpen} handleClose={closeEventDetail} />
      )}
    </div>
  );
};

export default EventPage;