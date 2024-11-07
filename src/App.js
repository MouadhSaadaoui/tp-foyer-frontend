import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [reservations, setReservations] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [estValide, setEstValide] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = () => {
    fetch('http://localhost:8089/tpfoyer/reservation/retrieve-all-reservations')
      .then(response => response.json())
      .then(data => setReservations(data))
      .catch(error => console.error('Error fetching reservations:', error));
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedDate = formatDate(date);
    const newReservation = { name, anneeUniversitaire: formattedDate, estValide };

    fetch('http://localhost:8089/tpfoyer/reservation/add-reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReservation),
    })
      .then(response => response.json())
      .then(data => {
        setReservations([...reservations, data]);
        setName('');
        setDate('');
        setEstValide(false);
        setMessage('Reservation added successfully!');
      })
      .catch(error => {
        console.error('Error adding reservation:', error);
        setMessage('Failed to add reservation.');
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Reservations</h1>
        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="form-group">
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              id="date"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="estValide">Valid:</label>
            <input
              type="checkbox"
              id="estValide"
              checked={estValide}
              onChange={(e) => setEstValide(e.target.checked)}
            />
          </div>
          <button type="submit" className="submit-button">Add Reservation</button>
        </form>
        {message && <p className="message">{message}</p>}
        <ul className="reservation-list">
          {reservations.map(reservation => (
            <li key={reservation.id} className="reservation-item">
              {reservation.name} - {reservation.anneeUniversitaire} - {reservation.estValide ? 'Valid' : 'Invalid'}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
