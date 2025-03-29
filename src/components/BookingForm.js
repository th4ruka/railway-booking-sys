import React, { useState } from "react";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    train: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking confirmed:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" onChange={handleChange} required />

      <label>Train:</label>
      <input type="text" name="train" onChange={handleChange} required />

      <label>Date:</label>
      <input type="date" name="date" onChange={handleChange} required />

      <button type="submit">Book Ticket</button>
    </form>
  );
};

export default BookingForm;
