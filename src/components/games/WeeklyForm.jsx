import React, { useState, useEffect } from 'react';
import { Container, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

const WeeklyForm = () => {
  const { weekNumber } = useParams();
  const [games, setGames] = useState([]);
  const [selections, setSelections] = useState({});
  const [formLocked, setFormLocked] = useState(false);

  useEffect(() => {
    // Load the data for the selected week
    const loadGameData = async () => {
      try {
        const response = await fetch(`/game_details/week${weekNumber}_games_info.json`);
        const data = await response.json();
        setGames(data);

        // Check if the form should be locked (10 minutes before first game)
        const firstGameTime = new Date(data[0].game_time);
        const now = new Date();
        if (now >= new Date(firstGameTime.getTime() - 10 * 60 * 1000)) {
          setFormLocked(true);
        }
      } catch (error) {
        console.error('Error loading game data:', error);
      }
    };

    loadGameData();
  }, [weekNumber]);

  const handleSelectionChange = (event, gameId) => {
    setSelections({ ...selections, [gameId]: event.target.value });
  };

  const handleSubmit = () => {
    // Save to Firebase, include the Twitter handle
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        g00b Weekly Pick'em Challenge - Week {weekNumber}
      </Typography>

      {formLocked ? (
        <Typography variant="h6" color="error">
          The form is now locked. You can no longer submit your picks for this week.
        </Typography>
      ) : (
        games.map((game, index) => (
          <FormControl key={index} component="fieldset" style={{ marginBottom: '20px' }}>
            <FormLabel component="legend">
              {game.away_team} (Away) vs {game.home_team} (Home)
              <Typography variant="body2" color="textSecondary">
                {new Date(game.game_time).toLocaleString()}
              </Typography>
            </FormLabel>
            <RadioGroup
              value={selections[index] || ''}
              onChange={(e) => handleSelectionChange(e, index)}
            >
              <FormControlLabel value={game.away_team} control={<Radio />} label={game.away_team} />
              <FormControlLabel value={game.home_team} control={<Radio />} label={game.home_team} />
            </RadioGroup>
          </FormControl>
        ))
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={formLocked}
      >
        Submit Picks
      </Button>
    </Container>
  );
};

export default WeeklyForm;

