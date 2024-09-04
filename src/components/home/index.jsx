import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const calculateCurrentWeek = () => {
      const startDate = new Date('2024-09-05'); // Start date of Week 1
      const today = new Date();
      const diffInDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
      return Math.floor(diffInDays / 7) + 1; // Calculate the week number
    };
    setCurrentWeek(calculateCurrentWeek());
  }, []);

  const handleNavigateToWeek = (week) => {
    navigate(`/week/${week}`);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        g00b Weekly Pick'em Challenge
      </Typography>
      <Typography variant="h6">Current Week: {currentWeek}</Typography>
      {[...Array(18).keys()].map((_, index) => {
        const week = index + 1;
        return (
          <div key={week} style={{ marginBottom: '10px' }}>
            <Button
              variant="contained"
              color={week === currentWeek ? 'primary' : 'secondary'}
              onClick={() => handleNavigateToWeek(week)}
              disabled={week !== currentWeek}
            >
              {week === currentWeek ? 'Make Your Picks' : `Week ${week} - Locked`}
            </Button>
          </div>
        );
      })}
    </Container>
  );
};

export default HomePage;

