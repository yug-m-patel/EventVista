"use client";

import { useState } from "react";
// Assuming these are your components
import Header from "./Header";
import Sidebar from "./Sidebar";

const initialEvents = [
  {
    id: "1",
    title: "Tech Conference 2024",
    description: "Annual tech conference",
    date: "2024-06-15",
    time: "09:00",
    type: "Conference",
    department: "Information Technology",
    venue: "Convention Center",
    isOnline: false,
    thumbnail: "/placeholder.svg?height=100&width=100",
    images: [],
    videos: [],
    isPaid: true,
    amount: 100,
  },
  {
    id: "2",
    title: "Virtual Team Building Workshop",
    description: "Company-wide team building event",
    date: "2024-07-22",
    time: "14:00",
    type: "Workshop",
    department: "Human Resources",
    venue: "",
    isOnline: true,
    thumbnail: "/placeholder.svg?height=100&width=100",
    images: [],
    videos: [],
    isPaid: false,
    amount: 0,
  },
];

export default function EventCreate() {
  const [events, setEvents] = useState(initialEvents);
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

    if (!newEvent.department.trim()) {
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
    const updatedEvent = editingEvent || newEvent;
    setEditingEvent(editingEvent ? { ...editingEvent, [name]: value } : null);
    setNewEvent({ ...updatedEvent, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    const updatedEvent = editingEvent || newEvent;
    setIsCustomType(value === "custom");
    setEditingEvent(editingEvent ? { ...editingEvent, [name]: value } : null);
    setNewEvent({ ...updatedEvent, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedEvent = editingEvent || newEvent;
    setEditingEvent(editingEvent ? { ...editingEvent, [name]: checked } : null);
    setNewEvent({
      ...updatedEvent,
      [name]: checked,
      venue: checked ? "" : updatedEvent.venue,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (editingEvent) {
        setEvents(
          events.map((event) =>
            event.id === editingEvent.id ? { ...editingEvent, ...newEvent } : event
          )
        );
        setEditingEvent(null);
      } else {
        const id = Math.random().toString(36).substr(2, 9);
        setEvents([...events, { ...newEvent, id }]);
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
      setIsCustomType(false);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setNewEvent(event);
    setIsCustomType(
      !["Conference", "Workshop", "Seminar", "Webinar"].includes(event.type)
    );
    setErrors({
      title: "",
      description: "",
      date: "",
      time: "",
      type: "",
      department: "",
      venue: "",
      amount: "",
    });
  };

  const handleDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id));
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
                onChange={handleThumbnailChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition-all"
              />
              {newEvent.thumbnail && <img src={newEvent.thumbnail} alt="Thumbnail Preview" className="mt-4 max-h-40" />}
            </div>

            {/* Images upload */}
            <div className="mb-6">
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
            </div>

            {/* Videos upload */}
            <div className="mb-6">
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
            </div>

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
              {events.map((event) => (
                <li key={event.id} className="mb-4 p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <p className="text-gray-700">{event.description}</p>
                  <p className="text-gray-600">Date: {event.date}</p>
                  <p className="text-gray-600">Time: {event.time}</p>
                  <p className="text-gray-600">Type: {event.type}</p>
                  <p className="text-gray-600">Department: {event.department}</p>
                  <p className="text-gray-600">Venue: {event.venue}</p>
                  <p className="text-gray-600">Online: {event.isOnline ? "Yes" : "No"}</p>
                  <p className="text-gray-600">Paid: {event.isPaid ? "Yes" : "No"}</p>
                  {event.isPaid && <p className="text-gray-600">Amount: ${event.amount}</p>}
                  {event.thumbnail && <img src={event.thumbnail} alt="Event Thumbnail" className="mt-4 max-h-40" />}
                  <div className="mt-4 flex gap-4">
                    {event.images.map((image, index) => (
                      <img key={index} src={image} alt={`Event Image ${index}`} className="max-h-40" />
                    ))}
                  </div>
                  <div className="mt-4 flex gap-4">
                    {event.videos.map((video, index) => (
                      <video key={index} src={video} controls className="max-h-40" />
                    ))}
                  </div>
                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={() => handleEdit(event)}
                      className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
