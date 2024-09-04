import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button,
  TextField,
  Alert,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { db } from '../../firebase/firebase';
import { collection, addDoc, Timestamp, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

const GameSelection = ({ week, twitterHandle, onTwitterHandleSubmit }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPicks, setSelectedPicks] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`/game_details/week${week}_games_info.json`);
        if (response.ok) {
          const gamesData = await response.json();
          setGames(gamesData);
        } else {
          console.error('Failed to load game data:', response.statusText);
          setError('Failed to load game data.');
        }
      } catch (error) {
        console.error('Error fetching games:', error);
        setError('An error occurred while fetching game data.');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [week]);

  const handlePickChange = (gameId, selectedTeam) => {
    setSelectedPicks((prevPicks) => ({
      ...prevPicks,
      [gameId]: selectedTeam,
    }));
  };

  const validateForm = () => {
    if (!twitterHandle.trim()) {
      setError('Twitter handle is required.');
      return false;
    }

    if (Object.keys(selectedPicks).length !== games.length) {
      setError('Please make selections for all games.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitLoading(true);
    setError('');

    try {
      // Query the 'picks' collection to find a document with the given twitterHandle
      const picksQuery = query(
        collection(db, 'picks'),
        where('twitterHandle', '==', twitterHandle.trim())
      );
      const picksSnapshot = await getDocs(picksQuery);

      if (!picksSnapshot.empty) {
        // If the document exists, update it with the new week picks
        const docId = picksSnapshot.docs[0].id; // Get the document ID
        const docRef = doc(db, 'picks', docId);

        await updateDoc(docRef, {
          [`picks.week${week}`]: selectedPicks,
          timestamp: Timestamp.now(),
        });
      } else {
        // If the document doesn't exist, create a new one
        await addDoc(collection(db, 'picks'), {
          twitterHandle: twitterHandle.trim(),
          picks: {
            [`week${week}`]: selectedPicks,
          },
          timestamp: Timestamp.now(),
        });
      }

      setSuccess(true);
      setSelectedPicks({});
    } catch (err) {
      console.error('Error submitting picks:', err);
      setError('Failed to submit picks. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Weekly NFL g00b'em Challenge
      </Typography>
      
      
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
        <List>
          <ListItem>
            <ListItemText primary="1. Enter your Twitter handle." />
          </ListItem>
          <ListItem>
            <ListItemText primary="2. Make your picks (picks close 10 minutes before the first game each Thursday)." />
          </ListItem>
          <ListItem>
            <ListItemText primary="3. Keep your eyes on the leaderboard to track scores" />
          </ListItem>
          <ListItem>
            <ListItemText primary="4. There will be a weekly prize of 1 g00b for the best record each week." />
          </ListItem>
        </List>
      </Box>

      <Typography variant="h4" gutterBottom>
        Week {week} - Select Your Picks
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TextField
            label="Enter your Twitter handle"
            variant="outlined"
            fullWidth
            value={twitterHandle}
            onChange={(e) => onTwitterHandleSubmit(e.target.value)}
            sx={{ 
              marginBottom: 3, 
              width: { xs: '100%', sm: '50%', md: '300px' }, // Adjust width based on screen size
              margin: '0 auto' // Centering the TextField
            }}
          />

          <TableContainer component={Paper} sx={{ marginBottom: 3, width: { xs: '100%', sm: '80%', md: '70%' }, margin: '20px auto' }}>
            <Table aria-label="game selection table">
	      <TableHead>
                <TableRow>
                  <TableCell>Game</TableCell>
                  <TableCell align="center">Select Team</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {games.map((game, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {game.away_team} @ {game.home_team} - {game.game_time}
                    </TableCell>
                    <TableCell align="center">
                      <FormControl component="fieldset">
                        <RadioGroup
                          row
                          value={selectedPicks[index] || ''}
                          onChange={(e) => handlePickChange(index, e.target.value)}
                        >
                          <FormControlLabel
                            value={game.away_team}
                            control={<Radio />}
                            label={game.away_team}
                          />
                          <FormControlLabel
                            value={game.home_team}
                            control={<Radio />}
                            label={game.home_team}
                          />
                        </RadioGroup>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={submitLoading}
          >
            {submitLoading ? 'Submitting...' : 'Submit Picks'}
          </Button>

          <Snackbar
            open={success}
            autoHideDuration={6000}
            onClose={() => setSuccess(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
              onClose={() => setSuccess(false)}
              severity="success"
              sx={{ width: '100%' }}
            >
              Your picks have been submitted successfully!
            </Alert>
          </Snackbar>
        </>
      )}
    </Box>
  );
};

export default GameSelection;

