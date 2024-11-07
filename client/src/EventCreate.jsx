"use client";

import { useEffect, useState } from "react";
// Assuming these are your components
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://eventvista.onrender.com/api'
});

export default function EventCreate() {

  const [events, setEvents] = useState([]);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  let initialEvents = [];
  const fetchEvents = async () => {
    const response = await axios.get('https://eventvista.onrender.com/api/event/fetch')
    if (response.data && response.data.status) {
      // console.log(response.data.data)
      initialEvents = response.data.data
      setEvents(initialEvents)
    }
  };
  fetchEvents();

  // useEffect(() => {
  //   let isMounted = true;
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await fetch('https://eventvista.onrender.com/api/event/fetch');
  //       const data = await response.json();
  //       if (isMounted) {
  //         setEvents(data);
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch events:', error.message);
  //     }
  //   };

  //   fetchEvents();

  //   return () => {
  //     isMounted = false;
  //   }

  // }, []);



  // const [events, setEvents] = useState(initialEvents);


  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    type: "",
    department: "",
    venue: "",
    isOnline: false,
    thumbnail: "",
    images: [],
    videos: [],
    isPaid: false,
    amount: 0,
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [isCustomType, setIsCustomType] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    type: "",
    department: "",
    venue: "",
    amount: "",
  });
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar state

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: "",
      description: "",
      date: "",
      time: "",
      type: "",
      department: "",
      venue: "",
      amount: "",
    };

    if (!newEvent.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    if (!newEvent.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (!newEvent.date) {
      newErrors.date = "Date is required";
      isValid = false;
    }

    if (!newEvent.time) {
      newErrors.time = "Time is required";
      isValid = false;
    }

    if (!newEvent.type) {
      newErrors.type = "Event type is required";
      isValid = false;
    }

    if (!newEvent.department?.trim()) {
      newErrors.department = "Department is required";
      isValid = false;
    }

    if (!newEvent.isOnline && !newEvent.venue.trim()) {
      newErrors.venue = "Venue is required for offline events";
      isValid = false;
    }

    if (newEvent.isPaid && (!newEvent.amount || newEvent.amount <= 0)) {
      newErrors.amount = "Amount is required for paid events";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setIsCustomType(value === "custom");
    setNewEvent({ ...newEvent, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: checked,
      venue: checked ? "" : newEvent.venue,
    });
    if (checked) {
      setErrors({ ...errors, venue: "" });
    }
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    const isPaid = value === "paid";
    setNewEvent({ ...newEvent, isPaid, amount: isPaid ? newEvent.amount : 0 });
    setErrors({ ...errors, amount: "" });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEvent({ ...newEvent, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setNewEvent({ ...newEvent, images: imageUrls });
  };

  const handleVideosChange = (e) => {
    const files = Array.from(e.target.files);
    const videoUrls = files.map((file) => URL.createObjectURL(file));
    setNewEvent({ ...newEvent, videos: videoUrls });
  };
  
  // console.log(editingEvent);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const formattedEvent = {
        EventTitle: newEvent.title,
        Description: newEvent.description,
        Date: newEvent.date,
        Time: newEvent.time,
        Type: newEvent.type,
        Department: newEvent.department,
        OfflineVenue: newEvent.venue,
        Mode: newEvent.isOnline ? "Online" : "Offline",
        Fee: newEvent.isPaid ? "Paid" : "Free",
        PaidFee: newEvent.amount,
        Thumbnail: newEvent.thumbnail,
        Images: newEvent.images,
        Videos: newEvent.videos,
      };

      const formData = new FormData();
      if (file) {
        formData.append('image', file);
      }
  
      // console.log("formdata"+ formData)
      // console.log("file" + file)
      // console.log(formData.append('image', file) + "append")

  
      try {
        if (file) {
          const response = await axios.post('https://eventvista.onrender.com/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log(response.data.resultU + "post response");
          formattedEvent.Thumbnail = response.data.resultU;
          setImageUrl(response.data.resultU);
        }
      } catch (error) {
        console.error('Error uploading image', error);
      }
      
      try {
        if (editingEvent) {
          await axiosClient.patch(`https://eventvista.onrender.com/api/event/update/${editingEvent._id}`, formattedEvent);
          setEvents(
            events.map((event) =>
              event._id === editingEvent._id ? { ...editingEvent, ...newEvent } : event
            )
          );
          setEditingEvent(null);
        } else {
          const response = await axios.post('https://eventvista.onrender.com/api/event/create', formattedEvent);
          setEvents([...events, response.data]);
        }
        
        setNewEvent({
          title: "",
          description: "",
          date: "",
          time: "",
          type: "",
          department: "",
          venue: "",
          isOnline: false,
          thumbnail: "",
          images: [],
          videos: [],
          isPaid: false,
          amount: 0,
        });
      } catch (error) {
        console.error('Error while submitting event:', error.message);
      }
    }
  };
  

  const handleEdit = (e, event) => {
    e.preventDefault();
    console.log("Editing event", event);
    
    
    setNewEvent({
      title: event.EventTitle,
      description: event.Description,
      date: event.Date,
      time: event.Time,
      type: event.Type,
      department: event.Department,
      venue: event.OfflineVenue,
      isOnline: event.Mode === "Online", // Boolean check
      thumbnail: event.Thumbnail ,
      images: event.Images || [],
      videos: event.Videos || [],
      isPaid: event.Fee === "Paid", // Boolean check
      amount: event.PaidFee || 0,
    });
    setIsCustomType(
      !["Conference", "Workshop", "Seminar", "Webinar"].includes(event.type)
    );
    setEditingEvent(event);
  };
  
  const handleDelete = async (e, event) => {
    e.preventDefault();
    try {
      await axios.delete(`https://eventvista.onrender.com/api/event/delete/${event._id}`);
      
      setEvents(event.filter((ev) => ev._id !== event._id));
      console.log("Event deleted successfully.");
    } catch (error) {
      console.error("Error deleting event:", error.message);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content area */}
      <div className="flex-1">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Main container */}
        <div className="container mx-auto p-8 bg-gradient-to-br from-gray-100 to-gray-300 rounded-xl shadow-lg">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Event Vista</h1>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl">
            {/* Form fields */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-gray-700 mb-2">Event Title</label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition-all"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Description */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 mb-2">Event Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Event Description"
                value={newEvent.description}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition-all"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Date */}
            <div className="mb-6">
              <label htmlFor="date" className="block text-gray-700 mb-2">Event Date</label>
              <input
                id="date"
                type="date"
                name="date"
                value={newEvent.date}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition-all"
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>

            {/* Time */}
            <div className="mb-6">
              <label htmlFor="time" className="block text-gray-700 mb-2">Event Time</label>
              <input
                id="time"
                type="time"
                name="time"
                value={newEvent.time}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition-all"
              />
              {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
            </div>

            {/* Type */}
            <div className="mb-6">
              <label htmlFor="type" className="block text-gray-700 mb-2">Event Type</label>
              <select
                id="type"
                name="type"
                value={newEvent.type}
                onChange={handleSelectChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition-all"
              >
                <option value="">Select type</option>
                <option value="Conference">Conference</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Webinar">Webinar</option>
                <option value="custom">Custom</option>
              </select>
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
            </div>

            {/* Department */}
            <div className="mb-6">
              <label htmlFor="department" className="block text-gray-700 mb-2">Department</label>
              <input
                id="department"
                type="text"
                name="department"
                placeholder="Department"
                value={newEvent.department}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition-all"
              />
              {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
            </div>

            {/* Venue */}
            <div className="mb-6">
              <label htmlFor="venue" className="block text-gray-700 mb-2">Event Venue</label>
              <input
                id="venue"
                type="text"
                name="venue"
                placeholder="Event Venue"
                value={newEvent.venue}
                onChange={handleInputChange}
                disabled={newEvent.isOnline}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition-all"
              />
              {errors.venue && <p className="text-red-500 text-sm mt-1">{errors.venue}</p>}
            </div>

            {/* Online Checkbox */}
            <div className="mb-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="isOnline"
                  checked={newEvent.isOnline}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Online Event</span>
              </label>
            </div>

            {/* Paid Radio Buttons */}
            <div className="mb-6">
              <p className="text-gray-700 mb-2">Event Payment</p>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="isPaid"
                  value="paid"
                  checked={newEvent.isPaid}
                  onChange={handleRadioChange}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Paid</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="isPaid"
                  value="free"
                  checked={!newEvent.isPaid}
                  onChange={handleRadioChange}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Free</span>
              </label>
              {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
            </div>

            {/* Amount */}
            {newEvent.isPaid && (
              <div className="mb-6">
                <label htmlFor="amount" className="block text-gray-700 mb-2">Amount</label>
                <input
                  id="amount"
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={newEvent.amount}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition-all"
                />
                {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
              </div>
            )}

            {/* Thumbnail upload */}
            <div className="mb-6">
              <label htmlFor="thumbnail" className="block text-gray-700 mb-2">Thumbnail Image</label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition-all"
              />
              {imageUrl && <img src={imageUrl} alt="Thumbnail Preview" className="mt-4 max-h-40" />}
            </div>

            {/* Images upload */}
            {/* <div className="mb-6">
              <label htmlFor="images" className="block text-gray-700 mb-2">Event Images</label>
              <input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition-all"
              />
              <div className="mt-4 flex flex-wrap gap-4">
                {newEvent.images.map((image, index) => (
                  <img key={index} src={image} alt={`Event Image ${index}`} className="max-h-40" />
                ))}
              </div>
            </div> */}

            {/* Videos upload */}
            {/* <div className="mb-6">
              <label htmlFor="videos" className="block text-gray-700 mb-2">Event Videos</label>
              <input
                id="videos"
                type="file"
                accept="video/*"
                multiple
                onChange={handleVideosChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition-all"
              />
              <div className="mt-4 flex flex-wrap gap-4">
                {newEvent.videos.map((video, index) => (
                  <video key={index} src={video} controls className="max-h-40" />
                ))}
              </div>
            </div> */}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
            >
              {editingEvent ? "Update Event" : "Create Event"}
            </button>
          </form>

          {/* Event List */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Events List</h2>
            <ul>
              {events && events.length > 0 ? (
                events.map((event) => (
                  <li key={event?.id} className="mb-4 p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
                    <h3 className="text-xl font-semibold">{event?.EventTitle || "Untitled Event"}</h3>
                    <p className="text-gray-700">{event?.Description || "No description available"}</p>
                    <p className="text-gray-600">Date: {event?.Date || "N/A"}</p>
                    <p className="text-gray-600">Time: {event?.Time || "N/A"}</p>
                    <p className="text-gray-600">Type: {event?.Type || "N/A"}</p>
                    <p className="text-gray-600">Department: {event?.Department || "N/A"}</p>
                    <p className="text-gray-600">Venue: {event?.OfflineVenue || "N/A"}</p>
                    <p className="text-gray-600">Online: {event?.Mode ? "Yes" : "No"}</p>
                    <p className="text-gray-600">Paid: {event?.Fee ? "Yes" : "No"}</p>
                    {event?.isPaid && <p className="text-gray-600">Amount: ${event?.PaidFee || 0}</p>}
                    {event?.Thumbnail && <img src={event?.Thumbnail} alt="Event Thumbnail" className="mt-4 max-h-40" />}
                    <div className="mt-4 flex gap-4">
                      {event?.Images?.map((image, index) => (
                        <img key={index} src={image} alt={`Event Image ${index}`} className="max-h-40" />
                      ))}
                    </div>
                    <div className="mt-4 flex gap-4">
                      <button
                        onClick={(e) => handleEdit(e, event)}
                        className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, event)}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li>No events available</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

