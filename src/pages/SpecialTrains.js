import React from "react";

function SpecialTrains() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Special Trains</h1>
      <p>Explore our special trains for festivals, vacations, and emergencies.</p>
      <table border="1" style={{ margin: "auto", width: "80%", textAlign: "center" }}>
        <thead>
          <tr style={{ background: "#007bff", color: "#fff" }}>
            <th>Train Name</th>
            <th>Route</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Viceroy Special</td>
            <td>Matara → Colombo</td>
            <td>06:00 AM</td>
            <td>12:00 PM</td>
            <td>6h</td>
          </tr>
          <tr>
            <td>Festival Special</td>
            <td>Colombo → Jaffna</td>
            <td>08:00 PM</td>
            <td>02:00 AM</td>
            <td>6h</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SpecialTrains;
