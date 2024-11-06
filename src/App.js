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

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReservation = { name, date, estValide };

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
              {reservation.name} - {reservation.date} - {reservation.estValide ? 'Valid' : 'Invalid'}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;