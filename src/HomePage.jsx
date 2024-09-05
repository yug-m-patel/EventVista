import React, { useState, useEffect } from 'react';
import { format, differenceInSeconds } from 'date-fns';
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react';
import { CssBaseline, Grid, Box } from '@mui/material'; // Import required MUI components
import Header from './Header';
import Sidebar from './Sidebar';
import cseimg from './assets/images/cseevent.jpg';
import cllgimg from './assets/images/cllg.jpg';
import libimg from './assets/images/lib.jpg';

// Mock data for the main event and upcoming events
const mainEvent = {
  name: "Annual Tech Conference",
  date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
  image: cseimg,
  location: "Tech Center, Silicon Valley"
};

const upcomingEvents = [
  { 
    name: "Web Development Workshop", 
    date: new Date("2024-01-15T10:00:00"), 
    location: "Online",
    image: cllgimg 
  },
  { 
    name: "AI in Healthcare Seminar", 
    date: new Date("2024-01-20T14:00:00"), 
    location: "City Hospital Auditorium",
    image: cseimg
  },
  { 
    name: "Startup Networking Mixer", 
    date: new Date("2024-01-25T18:00:00"), 
    location: "TechHub Co-working Space",
    image: libimg 
  },
  { 
    name: "Data Science Bootcamp", 
    date: new Date("2024-02-01T09:00:00"), 
    location: "University Campus",
    image: cseimg 
  },
  { 
    name: "Cybersecurity Conference", 
    date: new Date("2024-02-10T11:00:00"), 
    location: "Convention Center",
    image: libimg 
  },
  { 
    name: "Mobile App Development Hackathon", 
    date: new Date("2024-02-15T08:00:00"), 
    location: "Innovation Lab",
    image: cllgimg 
  },
];

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(differenceInSeconds(targetDate, new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = differenceInSeconds(targetDate, new Date());
      if (newTimeLeft <= 0) {
        clearInterval(timer);
        setTimeLeft(0);
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-3xl md:text-5xl font-bold space-x-2 bg-primary/80 p-4 rounded-lg">
      <span>{days.toString().padStart(2, '0')}d</span>
      <span>{hours.toString().padStart(2, '0')}h</span>
      <span>{minutes.toString().padStart(2, '0')}m</span>
      <span>{seconds.toString().padStart(2, '0')}s</span>
    </div>
  );
}

function MainEventCard({ event }) {
  return (
    <div className="card w-full overflow-hidden">
      <div className="relative h-96 md:h-[500px]">
        <img
          src={event.image}
          alt={`${event.name} thumbnail`}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">{event.name}</h2>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <CountdownTimer targetDate={event.date} />
          </div>
          <div className="flex justify-between items-end">
            <div>
              <div className="flex items-center space-x-2 text-sm md:text-base mb-1">
                <CalendarIcon className="w-4 h-4 md:w-5 md:h-5" />
                <span>{format(event.date, "MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm md:text-base mb-1">
                <ClockIcon className="w-4 h-4 md:w-5 md:h-5" />
                <span>{format(event.date, "h:mm a")}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm md:text-base">
                <MapPinIcon className="w-4 h-4 md:w-5 md:h-5" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventCard({ event }) {
  return (
    <div className="card w-full overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-md" >
      <div className="relative h-48 md:h-64"> 
        <img
          src={event.image}
          alt={`${event.name} thumbnail`}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg md:text-xl font-semibold mb-2">{event.name}</h3> {/* Reduced font size */}
          <div className="flex items-center space-x-2 text-sm">
            <CalendarIcon className="w-4 h-4" />
            <span>{format(event.date, "MMMM d, yyyy")}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <ClockIcon className="w-4 h-4" />
            <span>{format(event.date, "h:mm a")}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <MapPinIcon className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div style={{ backgroundColor: '#f0f0f0', color: '#333' }}>
      <CssBaseline />
      <Header toggleSidebar={toggleSidebar} searchEvents={() => {}} /> {/* Add the Header */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} /> {/* Add the Sidebar */}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <div className="container mx-auto px-4 py-8">
            <div className="mb-16">
              <MainEventCard event={mainEvent} />
            </div>
            
            <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.slice(0, 6).map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
