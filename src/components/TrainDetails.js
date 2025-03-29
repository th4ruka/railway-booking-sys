import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TrainDetails = () => {
  const { id } = useParams(); // Get the train ID from the URL parameter
  const [train, setTrain] = useState(null);

  useEffect(() => {
    // Fetch the details of a specific train from an API or mock data
    axios.get(`https://api.example.com/trains/${id}`)  // Replace with your actual API
      .then(response => setTrain(response.data))
      .catch(error => console.error("Error fetching train details:", error));
  }, [id]); // Runs again if the ID changes (for example, when navigating to another train's details)

  // If data is still loading, show a loading message
  if (!train) {
    return <div>Loading...</div>;
  }

  return (
    <div className="train-details">
      <h2>Train Details</h2>
      <h3>{train.name}</h3>
      <p><strong>Departure:</strong> {train.departure}</p>
      <p><strong>Destination:</strong> {train.destination}</p>
      <p><strong>Departure Time:</strong> {train.departureTime}</p>
      <p><strong>Arrival Time:</strong> {train.arrivalTime}</p>
      <p><strong>Duration:</strong> {train.duration}</p>
      <p><strong>Train Type:</strong> {train.type}</p>
      <p><strong>Available Seats:</strong> {train.availableSeats}</p>
    </div>
  );
};

export default TrainDetails;
