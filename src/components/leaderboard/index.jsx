import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from '@mui/material';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useTheme } from '@mui/material/styles';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const picksCollection = collection(db, 'picks');
        const picksSnapshot = await getDocs(picksCollection);
        const picksData = picksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const resultsCollection = collection(db, 'results');
        const resultsSnapshot = await getDocs(resultsCollection);
        const resultsData = resultsSnapshot.docs.map(doc => doc.data());

        const updatedPicks = picksData.map(pick => {
          const result = resultsData.find(r => r.week === pick.week);
          if (result) {
            let score = 0;
            for (const game in pick.selections) {
              if (pick.selections[game] === result.results[game]) {
                score += 1;
              }
            }
            return { ...pick, score };
          }
          return pick;
        });

        // Update scores in Firestore
        for (const pick of updatedPicks) {
          const pickDocRef = doc(db, 'picks', pick.id);
          await updateDoc(pickDocRef, { score: pick.score });
        }

        // Sort leaderboard by score
        updatedPicks.sort((a, b) => b.score - a.score);

        setLeaderboardData(updatedPicks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center" color={theme.palette.text.primary}>
        Leaderboard
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.background.default, boxShadow: theme.shadows[2] }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: theme.palette.text.secondary }}>Twitter Handle</TableCell>
              <TableCell align="right" sx={{ color: theme.palette.text.secondary }}>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardData.map((entry, index) => (
              <TableRow key={index} hover sx={{ '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }}>
                <TableCell component="th" scope="row" sx={{ color: theme.palette.text.primary }}>
                  {entry.twitterHandle}
                </TableCell>
                <TableCell align="right" sx={{ color: theme.palette.text.primary }}>
                  {entry.score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Leaderboard;

