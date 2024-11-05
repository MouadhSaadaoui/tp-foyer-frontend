import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8089/tpfoyer/reservation/retrieve-all-reservations')
      .then(response => response.json())
      .then(data => setReservations(data))
      .catch(error => console.error('Error fetching reservations:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Reservations</h1>
        <ul>
          {reservations.map(reservation => (
            <li key={reservation.id}>{reservation.name}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;