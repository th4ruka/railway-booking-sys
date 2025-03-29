import React, { useEffect, useState } from "react";
import axios from "axios";

const TrainList = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    axios.get("https://api.example.com/trains")
      .then(response => setTrains(response.data))
      .catch(error => console.error("Error fetching trains", error));
  }, []);

  return (
    <div>
      <h2>Available Trains</h2>
      <ul>
        {trains.map(train => (
          <li key={train.id}>{train.name} - {train.departure} to {train.destination}</li>
        ))}
      </ul>
    </div>
  );
};

export default TrainList;
