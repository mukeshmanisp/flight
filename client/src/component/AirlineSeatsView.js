import React, { useState, useEffect } from 'react';
import { Button, Grid, Paper } from '@mui/material';
import {
  AirlineSeatIndividualSuite,
  AirlineSeatLegroomExtra,
} from '@mui/icons-material';
import './App.css';

const AirlineSeatsView = () => {
  // Initialize state with seats from localStorage or an empty array
  const [selectedSeats, setSelectedSeats] = useState(() => {
    const storedSeats = localStorage.getItem('selectedSeats');
    return storedSeats ? JSON.parse(storedSeats) : [];
  });

  // Function to handle seat click
  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      // Deselect the seat
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      // Select the seat
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  // Effect to save selected seats to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  // Function to render a seat button
  const renderSeat = (seatNumber) => {
    const isSelected = selectedSeats.includes(seatNumber);

    return (
      <Button
        className={isSelected ? 'selected-seat' : ''}
        variant={isSelected ? 'contained' : 'outlined'}
        startIcon={
          isSelected ? (
            <AirlineSeatIndividualSuite />
          ) : (
            <AirlineSeatLegroomExtra />
          )
        }
        onClick={() => handleSeatClick(seatNumber)}
      >
        {seatNumber}
      </Button>
    );
  };

  return (
    <div>
      <h2>Airline Seats View</h2>
      <Grid container spacing={2}>
        {Array.from({ length: 6 }, (_, row) => (
          <Grid container item justifyContent="center" key={row}>
            {Array.from({ length: 5 }, (_, col) => (
              <Grid item key={col}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  {renderSeat(`${String.fromCharCode(65 + row)}${col + 1}`)}
                </Paper>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AirlineSeatsView;
