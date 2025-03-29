import React from "react";

function TrainSchedule() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Train Schedule</h1>
      <p>Check the latest train schedules below:</p>
      <table border="1" style={{ margin: "auto", width: "80%", textAlign: "center" }}>
        <thead>
          <tr style={{ background: "#007bff", color: "#fff" }}>
            <th>Train Name</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Udarata Manike</td>
            <td>08:00 AM</td>
            <td>12:00 PM</td>
            <td>4h</td>
          </tr>
          <tr>
            <td>Ruhunu Kumari</td>
            <td>10:00 AM</td>
            <td>13:00 PM</td>
            <td>3h</td>
          </tr>
          <tr>
            <td>Yal Devi</td>
            <td>05:00 AM</td>
            <td>03:00 PM</td>
            <td>10h</td>
          </tr>
          <tr>
            <td>Northern Line</td>
            <td>11.00AM</td>
            <td>03:00 PM</td>
            <td>4h</td>
          </tr>
          <tr>
            <td>Nanu Oya</td>
            <td>14:00 pM</td>
            <td>19:00 PM</td>
            <td>5h</td>
          </tr>
          <tr>
            <td>Coast Line</td>
            <td>10:00 AM</td>
            <td>13:00 PM</td>
            <td>3h</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TrainSchedule;
